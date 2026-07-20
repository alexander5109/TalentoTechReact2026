import { useEffect, useState } from "react";

import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";

import { getFeatures, getAllPromotions, getPromotion, createPromotion, updatePromotion, disablePromotion } from "../../../firebase/promotionsService";

import ApdLayoutStack from "../../common/ApdLayoutStack/ApdLayoutStack";

import ApdInput from "../../common/ApdInput/ApdInput";
import ApdButton from "../../common/ApdButton/ApdButton";
import { useParams } from "react-router-dom";
import ApdLabel from "../../common/ApdLabel/ApdLabel";
import ApdLink from "../../common/ApdLink/ApdLink";
import Swal from "sweetalert2";

export default function PromotionCreatePage() {
	const { id: currentPromotionId } = useParams();

	const [formData, setFormData] = useState({
		nombre: "",
		codigo: "",
		descripcion: "",
		duracionDias: 30,
		activa: true,
		features: []
	});



	const [currentPromotion, setCurrentPromotion] = useState(null);
	const [availableFeatures, setAvailableFeatures] = useState([]);

	useEffect(() => {

		async function loadData() {

			const features = await getFeatures();
			setAvailableFeatures(features);


			if (currentPromotionId) {

				const promotion = await getPromotion(currentPromotionId);

				setCurrentPromotion(promotion);

				setFormData({
					nombre: promotion.nombre ?? "",
					codigo: promotion.codigo ?? "",
					descripcion: promotion.descripcion ?? "",
					duracionDias: promotion.duracionDias ?? 30,
					activa: promotion.activa ?? true,
					features: promotion.features ?? []
				});
			}

		}


		loadData();

	}, [id]);





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

	async function handleUpdatePromotion() {


		await updatePromotion(currentPromotionId);
		Swal.fire({
			title: "Cambios guardados",
			icon: 'info',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})

	}

	async function handleSubmit(e) {
		if (currentPromotionId) {
			action = "Promocion modificada"
			await updatePromotion(currentPromotionId, formData);
		}
		else {
			action = "Promocion creada"
			await createPromotion(formData);
		}

		Swal.fire({
			title: action,
			icon: 'info',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})


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
				<ApdButton variant="danger" onClick={handleDisablePromotion}> Desactivar </ApdButton>
				<ApdLink variant="secondary" to="/userAdminPanel" >
					Volver
				</ApdLink>
			</ApdLayoutStack>

		</ApdLayoutStack>

	</ApdPanel >

}