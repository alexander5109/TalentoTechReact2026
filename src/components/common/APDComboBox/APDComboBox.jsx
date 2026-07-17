import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./APDComboBox.module.css";

export default function APDComboBox({
	widgetLabel,
	value,
	onChange,
	options = [],
	placeholder = "Buscar..."

}) {

	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");

	const containerRef = useRef(null);

	const selectedOption = options.find(
		option => option.value === value
	);

	const filteredOptions = useMemo(() => {

		if (!query.trim()) {
			return options;
		}

		return options.filter(option =>
			option.label
				.toLowerCase()
				.includes(query.toLowerCase())
		);

	}, [options, query]);

	useEffect(() => {

		function handleClickOutside(event) {

			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {

				setIsOpen(false);
				setQuery("");

			}

		}

		document.addEventListener(
			"mousedown",
			handleClickOutside
		);

		return () =>
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);

	}, []);

	function handleOpen() {

		setIsOpen(true);

		setQuery(
			selectedOption?.label ?? ""
		);

	}

	function handleSelect(option) {

		onChange(option.value);

		setIsOpen(false);

		setQuery("");

	}

	return (

		<div
			ref={containerRef}
			className={styles.container}
		>

			<label className={styles.widgetLabel}>
				{widgetLabel}
			</label>

			{
				isOpen ? (

					<input

						autoFocus

						className={styles.input}

						value={query}

						placeholder={placeholder}

						onChange={(e) =>
							setQuery(e.target.value)
						}

					/>

				) : (

					<button

						type="button"

						className={styles.button}

						onClick={handleOpen}

					>

						<span>

							{
								selectedOption?.label ??
								placeholder
							}

						</span>

						<span>

							▾

						</span>

					</button>

				)
			}

			{
				isOpen && (

					<ul className={styles.dropdown}>

						{
							filteredOptions.length > 0

								? filteredOptions.map(option => (

									<li

										key={option.value}

										onClick={() =>
											handleSelect(option)
										}

										className={styles.option}

									>

										{option.label}

									</li>

								))

								: (

									<li
										className={styles.empty}
									>

										Sin resultados

									</li>

								)

						}

					</ul>

				)
			}

		</div>

	);

}