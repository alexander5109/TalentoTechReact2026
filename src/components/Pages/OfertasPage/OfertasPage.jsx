import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import BusquedasContainer from "./BusquedasContainer/BusquedasContainer"
import FiltrosOfertasContainer from "./FiltrosOfertasContainer/FiltrosOfertasContainer"
import styles from "./OfertasPage.module.css"
import { useAuth } from "../../../context/AuthContext";
import { createProfile } from "../../../firebase/ProfileService";
import ApdButton from "../../common/ApdButton/ApdButton";

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

	return <div className={styles.layout}>
		<section className={styles.content}>
			<nav className={styles.borderedContent}>
				<BusquedasContainer
					profiles={profiles}
					selectedProfileId={selectedProfileId}
					onSelectProfile={handleLoadProfile}
					onSaveProfile={handleSaveCurrentFilters}
					onDeleteProfile={handleDeleteProfile}
				/>
			</nav>
			<nav className={styles.borderedContent}>
				<FiltrosOfertasContainer
					filtros={filtros}
					setFiltros={setFiltros}
				/>
			</nav>
		</section>
		<section className={styles.content}>
			<OfertaListContainer
				filtros={filtros}
			/>
		</section>

	</div>
}