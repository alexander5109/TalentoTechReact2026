import TextContainer from "../common/TextContainer/TextContainer";
import SectionTitleH3 from "../common/SectionTitleH3/SectionTitleH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import SearchProfilesPanel from "./SearchProfilesPanel/SearchProfilesPanel";
import styles from "./MyProfilesPage.module.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../../firebase/ProfileService";



export default function MyProfilesPage() {
	const [loading, setLoading] = useState(true);
	return (
		<UserForm
			initialData={usuario}
			submitText="Guardar cambios"
			onSubmit={actualizarUsuario}
		/>
	);
}