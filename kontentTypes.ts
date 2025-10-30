// kontentTypes.ts
import { Elements as KontentElements } from "@kontent-ai/delivery-sdk";

// A union of Kontent.ai element types you might map to
export type KontentElementType =
	| KontentElements.TextElement
	| KontentElements.RichTextElement;

// The mapped element structure
export interface KontentElement {
	kontentType: string; // e.g. 'text', 'rich_text', etc
	kontentElement: KontentElementType;
}
