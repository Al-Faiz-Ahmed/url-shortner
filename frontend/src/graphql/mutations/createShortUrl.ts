import { gql } from "@apollo/client";

import type { GeneratedURL } from "@/types";

export type CreateShortUrlVariables = {
  url: string;
};

export type CreateShortUrlResponse = {
  createShortUrl: GeneratedURL;
};

// Adjust the field names to match your backend schema if needed.
export const CREATE_SHORT_URL_MUTATION = gql`
  mutation CreateShortUrl($url: String!) {
    createShortUrl(url: $url) {
      id
    }
  }
`;

