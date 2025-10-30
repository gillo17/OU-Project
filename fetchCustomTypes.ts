import axios from "axios";
import { createManagementClient } from '@kontent-ai/management-sdk';
import { PrismicField, PrismicPage, PrismicComponent } from './prismicTypes';
import { MappedElement, KontentElementType } from './kontentTypes';
import { Elements } from '@kontent-ai/delivery-sdk';

const client = createManagementClient({
    environmentId: 'xxx', // id of your Kontent.ai environment
    subscriptionId: 'zzz', // optional, but required for Subscription related endpoints
    apiKey: 'yyy' // Content management API token
});

const REPO_NAME = "scriptbuildertest"; // replace with your Prismic repo name
const ACCESS_TOKEN = "----"; // store your token safely!

// The Prismic Custom Types API endpoint
const API_URL = `https://${REPO_NAME}.prismic.io/customtypes`;


export function splitPrismicComponents(page: Record<string, PrismicField>): PrismicComponent[] {
  return Object.entries(page).map(([key, field]) => ({
    key,
    type: field.type,
    config: field.config
  }));

}


function fetchCustomTypes() : PrismicPage {
  // try {
  //   const response = await axios.get(API_URL, {
  //     headers: {
  //       repository: REPO_NAME,
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   console.log("✅ Custom types fetched successfully!");
  //   console.log(JSON.stringify(response.data, null, 2));
  // } catch (error: any) {
  //   console.error("❌ Error fetching custom types:", error.response?.data || error.message);
  // }

  return {
  "Main" : {
    "page-title" : {
      "type" : "StructuredText",
      "config" : {
        "single" : "heading1,heading2,heading3,heading4,heading5,heading6",
        "label" : "page-title"
      }
    },
    "page-paragrph" : {
      "type" : "StructuredText",
      "config" : {
        "multi" : "paragraph,heading1,heading2,heading3,heading4,heading5,em,hyperlink,list-item,o-list-item",
        "label" : "page-paragrph"
      }
    },
    "page-link" : {
      "type" : "Link",
      "config" : {
        "label" : "page-link",
        "select" : null
      }
    }
  }
}
}

function mapPrismicToKontent(component: PrismicComponent) : MappedElement {
  console.log(component)
  let kontentType: string;
  let kontentElement: KontentElementType;


  switch (component.key) {
    case 'StructuredText':
      if (component.config.single) {

        return buildMappedElement(component.key, 'text', component.config )

        kontentType = 'text';
        kontentElement = { value: '' } as Elements.TextElement;
      } else {
        kontentType = 'rich_text';
        kontentElement = { value: '' } as Elements.RichTextElement;
      }
      break;

    case 'Link':
      kontentType = 'url_slug';
      kontentElement = { value: '' } as Elements.UrlSlugElement;
      break;

    default:
      // fallback custom
      kontentType = 'custom';
      kontentElement = { value: '' } as Elements.CustomElement<any>;
      break;
  }

  return {
    codename: component.key,
    kontentType,
    kontentElement
  };
}

function buildMappedElement(codename: string, kontentType: string, kontentElement: Elements.CustomElement<any>): MappedElement {
  return {
    codename,
    kontentType,
    kontentElement: {
      allowedBlockTypes: 
    }
  }
}



const prismicPageJson = fetchCustomTypes();
const componentsArray = splitPrismicComponents(prismicPageJson.Main);

const MappedKontentElements: MappedElement[] = []

componentsArray.forEach(component => {
  const kontentComponent: MappedElement = mapPrismicToKontent(component)
  MappedKontentElements.push(kontentComponent)
});

console.log(MappedKontentElements)
