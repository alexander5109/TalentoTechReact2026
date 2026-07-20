import { useEffect, useState } from "react";

import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "./../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";

import { getPromotion, createPromotion, updatePromotion, deletePromotion } from "./../../../firebase/promotionsService";
import ApdLayoutStack from "./../../common/ApdLayoutStack/ApdLayoutStack";

// import ApdRadioFilterGroup from "./../../common/ApdRadioFilterGroup/ApdRadioFilterGroup";
import ApdSelect from "./../../common/ApdSelect/ApdSelect";
import ApdInput from "./../../common/ApdInput/ApdInput";
import ApdButton from "./../../common/ApdButton/ApdButton";
import { useNavigate, useParams } from "react-router-dom";
import ApdLabel from "./../../common/ApdLabel/ApdLabel";
import ApdLink from "./../../common/ApdLink/ApdLink";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";
import { Timestamp } from "firebase/firestore";

export default function PromotionCreatePage() {
	const { promotionId } = useParams();
	const navigate = useNavigate();

	const { availableFeatures } = useAuth();
	const today = new Date().toISOString().split("T")[0];

	const [formData, setFormData] = useState({
		nombre: "",
		codigo: "",
		descripcion: "",
		vigenciaDesde: today,
		vigenciaHasta: "",
		activa: true,
		features: []
	});


	useEffect(() => {

		async function loadData() {



			if (promotionId) {

				const currentPromotion = await getPromotion(promotionId);

				setFormData({
					nombre: currentPromotion.nombre ?? "",
					codigo: currentPromotion.codigo ?? "",
					descripcion: currentPromotion.descripcion ?? "",
					vigenciaDesde: currentPromotion.vigenciaDesde ?? today,
					vigenciaHasta: currentPromotion.vigenciaHasta ?? "",
					activa: currentPromotion.activa ?? true,
					features: currentPromotion.features ?? []
				});
			}

		}


		loadData();

	}, [promotionId]);



	function handleChange(e) {

		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: name === "codigo"
				? value.trim().toUpperCase()
				: value
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

	async function handleDeletePromotion() {
		const result = await Swal.fire({
			title: "Eliminar la promoción?",
			text: "Esta acción eliminará la promoción de forma permanente y romperá las descripciones de usuarios. \nUtilize con precaución",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
			reverseButtons: true
		});

		if (!result.isConfirmed) return;

		await deletePromotion(promotionId);
		Swal.fire({
			title: "Promocion eliminada",
			icon: 'info',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
		navigate("/userAdminPanel");

	}

	async function handleSubmit(e) {
		e.preventDefault();

		const promotion = {
			...formData,
			codigo: formData.codigo.trim().toUpperCase(),
			vigenciaDesde: Timestamp.fromDate(new Date(formData.vigenciaDesde)),
			vigenciaHasta: Timestamp.fromDate(new Date(formData.vigenciaHasta))
		};

		if (promotionId) {
			await updatePromotion(promotionId, promotion);
			Swal.fire({
				title: "Promocion modificada",
				icon: 'info',
				timer: 1500,
				showConfirmButton: false,
				toast: true,
				position: 'top-end'
			})
		}
		else {
			await createPromotion(promotion);
			Swal.fire({
				title: "Promocion creada",
				icon: 'info',
				timer: 1500,
				showConfirmButton: false,
				toast: true,
				position: 'top-end'
			})
			navigate("/userAdminPanel");
		}


	}

	return <ApdPanel as="section">
		<ApdH3TitleSubtitle
			upper="Gestión comercial"
			lower={
				promotionId
					? "Editar promoción"
					: "Nueva promoción"
			}
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
					style={{ textTransform: "uppercase" }}
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
				<ApdLabel htmlFor="vigenciaDesde">
					Vigente desde
				</ApdLabel>

				<ApdInput
					id="vigenciaDesde"
					name="vigenciaDesde"
					type="date"
					required
					value={formData.vigenciaDesde}
					onChange={handleChange}
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="vigenciaHasta">
					Vigente hasta
				</ApdLabel>

				<ApdInput
					id="vigenciaHasta"
					name="vigenciaHasta"
					type="date"
					required
					min={formData.vigenciaDesde}
					value={formData.vigenciaHasta}
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



			<ApdLayoutStack>
				<ApdLabel htmlFor="estadoPromocion">Estado (días)</ApdLabel>
				<ApdSelect
					id="activa"
					name="activa"
					value={String(formData.activa)}
					onChange={(e) =>
						setFormData(prev => ({
							...prev,
							activa: e.target.value === "true"
						}))
					}
					options={[
						{ value: "true", label: "🟢 Activa" },
						{ value: "false", label: "⚫ Desactivada" }
					]}
				/>

			</ApdLayoutStack>

			<ApdLayoutStack direction="row" align="center">
				<ApdButton variant="primary" type="submit"> Guardar </ApdButton>
				{promotionId && <ApdButton variant="danger" onClick={handleDeletePromotion}> Eliminar </ApdButton>}
				<ApdLink variant="secondary" to="/userAdminPanel" >
					Volver
				</ApdLink>
			</ApdLayoutStack>

		</ApdLayoutStack>

	</ApdPanel >

}