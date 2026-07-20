import { useState, useEffect } from "react";
import OfertaList from "./OfertaList/OfertaList"
import ProfilesWidgetLists from "./ProfilesWidgetLists/ProfilesWidgetLists"
import FiltrosList from "./FiltrosList/FiltrosList"
import { useAuth } from "./../../../context/AuthContext";
import { getProfiles, createProfile, deleteProfile, updateProfile } from "../../../firebase/profileService";
import ApdButton from "./../../common/ApdButton/ApdButton";
import ApdPrettyP from "./../../common/ApdPrettyP/ApdPrettyP";
import ApdH3TitleSubtitle from "./../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdH3 from "./../../common/ApdH3/ApdH3";
import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdLayoutStack from "./../../common/ApdLayoutStack/ApdLayoutStack"
import ApdLayoutGrid from "./../../common/ApdLayoutGrid/ApdLayoutGrid"
import Swal from "sweetalert2";
const EMPTY_FILTERS = {
	cargos: [],
	distritos: [],
	estados: [],
	turnos: [],
	niveles: [],
};

export default function OfertasPage() {
	const { user } = useAuth();
	const [profiles, setProfiles] = useState([]);
	const [selectedProfileId, setSelectedProfileId] = useState("");

	const [filtros, setFiltros] = useState(EMPTY_FILTERS)

	useEffect(() => {
		if (!user) return;
		loadProfiles();
	}, [user]);

	const selectedProfile = profiles.find(p => p.id === selectedProfileId);

	const hasChanges =
		selectedProfile &&
		JSON.stringify(filtros) !== JSON.stringify({
			cargos: selectedProfile.cargos,
			distritos: selectedProfile.distritos,
			estados: selectedProfile.estados,
			turnos: selectedProfile.turnos,
			niveles: selectedProfile.niveles,
		});
	const hasFilters = Object.values(filtros).some(array => array.length > 0);

	async function handleCreateProfile() {

		const { value: nombre, isConfirmed } = await Swal.fire({
			title: "Nuevo perfil",
			input: "text",
			inputLabel: "Nombre del perfil",
			inputPlaceholder: "Ej: Primaria Mañana",
			inputValue: "Nuevo perfil",
			showCancelButton: true,
			confirmButtonText: "Crear",
			cancelButtonText: "Cancelar",
			inputValidator: (value) => {
				if (!value.trim()) {
					return "Debe ingresar un nombre.";
				}
			}
		});

		if (!isConfirmed) return;
		const profile = {
			nombre,
			cargos: filtros.cargos,
			distritos: filtros.distritos,
			estados: filtros.estados,
			turnos: filtros.turnos,
			niveles: filtros.niveles,
		};



		const created = await createProfile(
			user.uid,
			profile
		);
		await loadProfiles(created.id);

		Swal.fire({
			title: "Perfil creado",
			text:
				`${profile.nombre} guardado exitosamente`,
			icon: 'info',
			timer: 2500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})

	}



	async function handleUpdateProfile() {

		if (!selectedProfile) return;

		const updatedProfile = {
			...selectedProfile,

			cargos: filtros.cargos,
			distritos: filtros.distritos,
			estados: filtros.estados,
			turnos: filtros.turnos,
			niveles: filtros.niveles,
		};

		await updateProfile(
			user.uid,
			selectedProfile.id,
			updatedProfile
		);
		await loadProfiles(selectedProfile.id);

		Swal.fire({
			title: "Cambios guardados",
			icon: 'info',
			timer: 1000,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}
	async function handleDeleteProfile(id) {

		const result = await Swal.fire({
			title: "¿Eliminar perfil?",
			text: "Esta acción eliminará el perfil de búsqueda y no se puede deshacer.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
			confirmButtonColor: "#d33",
			reverseButtons: true
		});

		if (!result.isConfirmed) return;

		setSelectedProfileId("");

		setFiltros(EMPTY_FILTERS);
		await deleteProfile(user.uid, id);
		await loadProfiles();

		Swal.fire({
			title: "Perfil eliminado",
			icon: 'info',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}

	async function handleSelectProfile(profileId) {

		if (profileId === selectedProfileId)
			return;

		if (hasChanges) {
			const result = await Swal.fire({
				title: "¿Guardar cambios en la búsqueda?",
				icon: "question",
				showCancelButton: true,
				confirmButtonText: "Sí, actualizar",
				cancelButtonText: "Cancelar",
				reverseButtons: true
			});

			if (result.isDismissed)
				return;

			if (result.isConfirmed) {
				await handleUpdateProfile();
			}
		}

		if (!profileId) {
			setSelectedProfileId("");
			setFiltros(EMPTY_FILTERS);
			return;
		}

		const profile = profiles.find(p => p.id === profileId);
		if (!profile) return;

		setSelectedProfileId(profileId);

		setFiltros({
			cargos: profile.cargos ?? [],
			distritos: profile.distritos ?? [],
			estados: profile.estados ?? [],
			turnos: profile.turnos ?? [],
			niveles: profile.niveles ?? [],
		});
	}

	async function handleSaveCurrentFilters() {
		const profile = {
			nombre: "Nueva búsqueda",
			cargos: filtros.cargos,
			distritos: filtros.distritos,
			niveles: filtros.niveles,
			turnos: filtros.turnos,
			estados: filtros.estados
		};
		const created =
			await createProfile(user.uid, profile);

		setProfiles(prev => [...prev, created]);

	}
	async function loadProfiles(selectedId = null) {
		const loadedProfiles = await getProfiles(user.uid);
		setProfiles(loadedProfiles);
		if (selectedId) {
			setSelectedProfileId(selectedId);
		}
	}


	return <ApdLayoutStack direction="row" gap="1rem" align="flex-start">
		<ApdLayoutStack gap="1rem" flex="0 0 320px">

			{user &&
				<ApdPanel as="nav">
					<ApdH3>🔎 Mis búsquedas</ApdH3>
					<ApdLayoutStack as="nav">
						<ProfilesWidgetLists

							profiles={profiles}
							selectedProfileId={selectedProfileId}

							hasFilters={hasFilters}
							hasChanges={hasChanges}

							onSelectProfile={handleSelectProfile}
							onUpdateProfile={handleUpdateProfile}
							onCreateProfile={handleCreateProfile}
							onDeleteProfile={handleDeleteProfile}
						/>
					</ApdLayoutStack>
				</ApdPanel>}


			<ApdPanel as="section">
				<ApdH3>⚙️ Filtrar</ApdH3>
				<ApdLayoutStack as="form" direction="row" wrap="wrap" gap="2rem">
					<FiltrosList filtros={filtros} setFiltros={setFiltros} />
				</ApdLayoutStack>
			</ApdPanel>
		</ApdLayoutStack>




		<ApdPanel as="main" >
			<ApdH3>🔎 Listado de Ofertas</ApdH3>
			<ApdLayoutGrid align="stretch" columnGap="2rem" rowGap="2rem">
				<OfertaList filtros={filtros} />
			</ApdLayoutGrid>
		</ApdPanel>

	</ApdLayoutStack>
}