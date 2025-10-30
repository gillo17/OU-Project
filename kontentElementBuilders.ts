import { PrismicComponent } from "./prismicTypes";
import { KontentElement } from "./kontentTypes";
import { Elements as KontentElements } from "@kontent-ai/delivery-sdk";

/**
 * Builders for common Prismic -> Kontent element translations.
 * Each function accepts a PrismicComponent and returns a KontentElement.
 */

export function buildTextElement(component: PrismicComponent): KontentElement {
	return {
        kontentType: component.type
        kontentElement: KontentElements.Text,
}