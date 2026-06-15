import { Product, RecommendationWeights } from '@/types';

// Default weights (can be overridden via Admin)
export const DEFAULT_WEIGHTS: RecommendationWeights = {
  brand: 30,
  family: 25,
  model: 20,
  series: 15,
  category: 10,
  featuredBoost: 20,
};

export function calculateRecommendationScore(
  baseProduct: Product,
  candidate: Product,
  weights: RecommendationWeights = DEFAULT_WEIGHTS,
  isFeatured: boolean = false
): number {
  let score = 0;

  if (baseProduct.brand === candidate.brand) score += weights.brand;
  if (baseProduct.family === candidate.family) score += weights.family;
  if (baseProduct.model === candidate.model) score += weights.model;
  if (baseProduct.series === candidate.series) score += weights.series;
  if (baseProduct.category === candidate.category) score += weights.category;

  if (isFeatured) score += weights.featuredBoost;

  return score;
}

export function getSmartRecommendations(
  baseProduct: Product,
  allProducts: Product[],
  weights: RecommendationWeights = DEFAULT_WEIGHTS,
  featuredProductIds: string[] = []
) {
  const scored = allProducts
    .filter(p => p.id !== baseProduct.id)
    .map(product => ({
      product,
      score: calculateRecommendationScore(
        baseProduct,
        product,
        weights,
        featuredProductIds.includes(product.id)
      )
    }))
    .sort((a, b) => b.score - a.score);

  return {
    similar: scored.filter(item => 
      item.product.family === baseProduct.family && item.score > 30
    ).slice(0, 4).map(item => item.product),

    upgrades: scored.filter(item => {
      const baseNum = parseInt(baseProduct.model) || 0;
      const candNum = parseInt(item.product.model) || 0;
      return item.product.brand === baseProduct.brand && candNum > baseNum;
    }).slice(0, 3).map(item => item.product),

    budget: scored.filter(item => item.score < 50 && item.score > 10)
      .slice(0, 3).map(item => item.product),

    featured: scored.filter(item => featuredProductIds.includes(item.product.id))
      .slice(0, 3).map(item => item.product),
  };
}