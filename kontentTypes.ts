// kontentTypes.ts
import { Elements as KontentElements } from '@kontent-ai/delivery-sdk';

// A union of Kontent.ai element types you might map to
export type KontentElementType =
  | KontentElements.TextElement
  | KontentElements.RichTextElement
  | KontentElements.DateTimeElement
  | KontentElements.NumberElement
  | KontentElements.AssetsElement
  | KontentElements.MultipleChoiceElement
  | KontentElements.UrlSlugElement
  | KontentElements.TaxonomyElement
  | KontentElements.LinkedItemsElement<any>
  | KontentElements.CustomElement<any>;

// The mapped element structure
export interface MappedElement {
  codename: string;
  kontentType: string;           // e.g. 'text', 'rich_text', etc
  kontentElement: KontentElementType;
}
