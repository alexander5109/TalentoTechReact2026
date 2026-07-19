import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import BusquedasContainer from "./BusquedasContainer/BusquedasContainer"
import FiltrosOfertas from "./FiltrosOfertas/FiltrosOfertas"
import { useAuth } from "../../../context/AuthContext";
import { createProfile } from "../../../firebase/profileService";
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdH3 from "../../common/ApdH3/ApdH3";
import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdContainer from "../../common/ApdContainer/ApdContainer"

export default function OfertasPage() {
	const { user } = useAuth();
	const [profiles, setProfiles] = useState([]);
	const [selectedProfileId, setSelectedProfileId] = useState(null);

	const [filtros, setFiltros] = useState({
		cargos: [],
		distritos: [],
		estados: [],
		turnos: [],
		niveles: [],
	})



	async function handleSaveProfile() {
		await updateProfile(
			user.uid,
			editingProfile.id,
			editingProfile
		);
		setProfiles(prev =>
			prev.map(profile =>
				profile.id === editingProfile.id
					? editingProfile
					: profile
			)
		);
	}

	async function handleCreateProfile() {
		const profile = {
			nombre: "Nuevo perfil",
			distritos: [],
			niveles: [],
			cargos: [],
			escuelas: []
		};
		const created =
			await createProfile(
				user.uid,
				profile
			);
		setProfiles(prev => [
			...prev,
			created
		]);
		setSelectedProfileId(created.id);
	}


	async function handleDeleteProfile(id) {
		await deleteProfile(
			user.uid,
			id
		);
		const remaining =
			profiles.filter(
				p => p.id !== id
			);
		setProfiles(remaining);
		if (remaining.length > 0) {
			setSelectedProfileId(
				remaining[0].id
			);
		}
	}

	async function handleLoadProfile() { }
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
			await createProfile(
				user.uid,
				profile
			);


		setProfiles(prev => [
			...prev,
			created
		]);

	}

	return <ApdContainer direction="row" gap="1rem" align="flex-start">
		<ApdContainer gap="1rem" flex="0 0 320px">
			<ApdPanel as="nav">
				<ApdH3>🔎 Mis búsquedas</ApdH3>
				<BusquedasContainer
					profiles={profiles}
					selectedProfileId={selectedProfileId}
					onSelectProfile={handleLoadProfile}
					onSaveProfile={handleSaveCurrentFilters}
					onDeleteProfile={handleDeleteProfile}
				/>
			</ApdPanel>
			<ApdPanel as="section">
				<ApdH3>⚙️ Filtrar</ApdH3>
				<ApdContainer as="form" direction="row" wrap="wrap" gap="2rem">
					<FiltrosOfertas filtros={filtros} setFiltros={setFiltros} />
				</ApdContainer>
			</ApdPanel>
		</ApdContainer>

		<ApdPanel as="main" flex={1}>
			<ApdH3>🔎 Listado de Ofertas</ApdH3>
			<OfertaListContainer filtros={filtros} />
		</ApdPanel>

	</ApdContainer>
}