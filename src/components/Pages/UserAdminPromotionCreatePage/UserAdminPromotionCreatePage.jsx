import { useEffect, useState } from "react";

import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";

import { getFeatures, getPromotions, getPromotion, createPromotion, updatePromotion, disablePromotion } from "../../../firebase/promotionsService";

import ApdLayoutStack from "../../common/ApdLayoutStack/ApdLayoutStack";

import ApdInput from "../../common/ApdInput/ApdInput";
import ApdButton from "../../common/ApdButton/ApdButton";
import { useParams } from "react-router-dom";
import ApdLabel from "../../common/ApdLabel/ApdLabel";
import ApdLink from "../../common/ApdLink/ApdLink";

export default function PromotionCreatePage() {
	const { id } = useParams();
	useEffect(() => {
		if (!id)
			return;
		loadPromotion(id);
	}, [id]);

	const [formData, setFormData] = useState({
		nombre: "",
		codigo: "",
		descripcion: "",
		duracionDias: 30,
		activa: true,
		features: []
	});



	async function handleDesactivatePromotion(id) {

		const result = await Swal.fire({
			title: "Desactivar promoción?",
			text: "Esta acción no afectará a los usuarios que ya cuentan con la promocion.",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Sí, desactivar",
			cancelButtonText: "Cancelar",
			reverseButtons: true
		});

		if (!result.isConfirmed) return;

		await disablePromotion(user.uid);
		await getPromotions();

		Swal.fire({
			title: "Promocion desactivada",
			icon: 'info',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}


	const [currentPromotion, setCurrentPromotion] = useState(null);
	const [availableFeatures, setAvailableFeatures] = useState([]);


	useEffect(() => {

		async function loadFeatures() {
			const data = await getFeatures();
			setFeatures(data);
			const data2 = await getPromotion();
			setAvailableFeatures(data2);
		}

		loadFeatures();

	}, []);



	function handleChange(e) {

		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));

	}

	function handleFeatureChange(featureId) {

		setFormData(prev => ({

			...prev,

			features: prev.features.includes(featureId)
				? prev.features.filter(f => f !== featureId)
				: [...prev.features, featureId]

		}));

	}
	async function handleDisable() {

		await disablePromotion(id);

		navigate("/userAdmin");

	}
	async function handleSubmit(e) {
		if (id) {
			await updatePromotion(id, formData);
		}
		else {
			await createPromotion(formData);
		}
		console.log(formData);
		navigate("/userAdmin");
	}

	return <ApdPanel as="section">
		<ApdH3TitleSubtitle
			upper="Gestión comercial"
			lower="Nueva promoción"
		/>
		<ApdLayoutStack as="form" onSubmit={handleSubmit}>
			<ApdLayoutStack>
				<ApdLabel htmlFor="nombre">Nombre</ApdLabel>
				<ApdInput
					id="nombre"
					name="nombre"
					value={formData.nombre}
					onChange={handleChange}
					required
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="codigo">Código</ApdLabel>
				<ApdInput
					id="codigo"
					name="codigo"
					value={formData.codigo}
					onChange={handleChange}
					required
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="descripcion">Descripción</ApdLabel>
				<ApdInput
					as="textarea"
					id="descripcion"
					name="descripcion"
					value={formData.descripcion}
					onChange={handleChange}
					rows={4}
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="duracionDias">Duración (días)</ApdLabel>
				<ApdInput
					id="duracionDias"
					name="duracionDias"
					type="number"
					min={1}
					value={formData.duracionDias}
					onChange={handleChange}
				/>
			</ApdLayoutStack>
			<ApdLayoutStack>

				<ApdLabel>
					Beneficios
				</ApdLabel>

				{availableFeatures.map(feature => (
					<ApdLabel key={feature.id}>

						<input
							type="checkbox"
							checked={formData.features.includes(feature.id)}
							onChange={() => handleFeatureChange(feature.id)}
						/>

						{feature.nombre}

					</ApdLabel>
				))}

			</ApdLayoutStack>

			<ApdLayoutStack >
				<ApdButton type="submit"> Guardar promoción </ApdButton>
				<ApdButton variant="danger" onClick={() => handleDesactivatePromotion(currentPromotion.id)}> Desactivar </ApdButton>
				<ApdLink variant="secondary" to="/userAdminPanel" >
					Volver
				</ApdLink>
			</ApdLayoutStack>

		</ApdLayoutStack>

	</ApdPanel >

}