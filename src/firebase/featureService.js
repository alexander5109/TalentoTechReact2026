export async function resolveUserFeatures(userData) {

	const result = {};

	for (const active of userData.activePromotions ?? []) {

		const promotion = await getPromotion(active.promotionId);

		if (!promotion) continue;

		const now = new Date();

		const from = promotion.vigenciaDesde.toDate();
		const to = promotion.vigenciaHasta.toDate();

		if (now < from || now > to)
			continue;


		promotion.features.forEach(feature => {
			result[feature] = true;
		});
	}

	return result;
}