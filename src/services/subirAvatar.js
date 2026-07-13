const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;



async function estandarizarTamanio(file, maxSize = 256) {

	return new Promise((resolve, reject) => {

		const img = new Image();
		const reader = new FileReader();

		reader.onload = (e) => {
			img.src = e.target.result;
		};

		reader.onerror = reject;

		img.onload = () => {

			let { width, height } = img;

			if (width > height) {
				height *= maxSize / width;
				width = maxSize;
			} else {
				width *= maxSize / height;
				height = maxSize;
			}

			const canvas = document.createElement("canvas");

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext("2d");

			ctx.drawImage(img, 0, 0, width, height);

			canvas.toBlob(

				blob => {

					if (!blob) {
						reject(new Error("No fue posible redimensionar la imagen."));
						return;
					}

					resolve(blob);

				},

				"image/jpeg",
				0.9

			);

		};

		img.onerror = reject;

		reader.readAsDataURL(file);

	});

}

export async function subirAvatar(file) {

	if (!file) {
		return null;
	}

	const formData = new FormData();


	const imagenOptimizada = await estandarizarTamanio(file);
	formData.append("image", imagenOptimizada);

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