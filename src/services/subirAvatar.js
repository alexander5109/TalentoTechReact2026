const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function uploadAvatar(file) {

	if (!file) {
		return null;
	}

	const formData = new FormData();

	formData.append("image", file);

	const response = await fetch(
		`https://api.imgbb.com/1/upload?key=${API_KEY}`,
		{
			method: "POST",
			body: formData
		}
	);
	if (!response.ok) {
		throw new Error("Error al conectar con ImgBB.");
	}

	const data = await response.json();

	if (!data.success) {
		throw new Error("No fue posible subir la imagen.");
	}

	return data.data.url;
}