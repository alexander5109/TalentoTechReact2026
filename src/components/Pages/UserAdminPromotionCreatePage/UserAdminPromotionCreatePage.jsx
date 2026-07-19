import { useEffect, useState } from "react";

import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";

import ApdLayoutStack from "../../common/ApdLayoutStack/ApdLayoutStack";

import ApdInput from "../../common/ApdInput/ApdInput";
import ApdButton from "../../common/ApdButton/ApdButton";
import { useParams } from "react-router-dom";
import ApdLabel from "../../common/ApdLabel/ApdLabel";

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
				<ApdLabel>Beneficios</ApdLabel>

				<ApdLabel>
					<input
						type="checkbox"
						checked={formData.features.includes("alerts_3")}
						onChange={() => handleFeatureChange("alerts_3")}
					/>
					Hasta 3 alertas
				</ApdLabel>

				<ApdLabel>
					<input
						type="checkbox"
						checked={formData.features.includes("school_map")}
						onChange={() => handleFeatureChange("school_map")}
					/>
					Mapa de establecimientos
				</ApdLabel>

				<ApdLabel>
					<input
						type="checkbox"
						checked={formData.features.includes("remove_ads")}
						onChange={() => handleFeatureChange("remove_ads")}
					/>
					Sin publicidad
				</ApdLabel>

				<ApdLabel>
					<input
						type="checkbox"
						checked={formData.features.includes("mobile_notifications")}
						onChange={() => handleFeatureChange("mobile_notifications")}
					/>
					Notificaciones móviles
				</ApdLabel>

			</ApdLayoutStack>

			<ApdLayoutStack >
				<ApdButton type="submit"> Guardar promoción </ApdButton>
				<ApdButton variant="danger"> Desactivar </ApdButton>
				<ApdButton variant="secondary"> Volver </ApdButton>
			</ApdLayoutStack>

		</ApdLayoutStack>

	</ApdPanel >

}