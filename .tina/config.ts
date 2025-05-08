import { defineConfig } from "tinacms";
import schema from "./schema";
import { client } from './__generated__/client'
// Your tina config
// ==============
const branch = 'main';
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  cmsCallback: (cms) => {
    import('tinacms').then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        return undefined;
      });

      cms.plugins.add(RouteMapping);
    });

    import('react-tinacms-editor').then((field) => {
      cms.plugins.add(field.MarkdownFieldPlugin);
    });

    return cms;
  },
});
