import { Layout } from "react-grid-layout";

export interface Tag {
  id?: number | string;
  name: string;
  inputValue?: string;
  value?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface AppSection {
  id: string;
  title: string;
  inputs_order: string[];
  type: string;
  name?: string;
  cols?: number;
}

export interface AppInput {
  id: string;
  component: string;
  props: {
    [prop: string]: any;
  };
}

export interface App {
  app_id: string;
  name: string;
  description: string;
  author: {
    id: string;
    username: string;
    image?: string;
  };
  category: Category;
  tags: Tag[];
  created_on: string;
  updated_at: string;
  primary_image: string;
  favicon_image: string;
  input_sections: {
    [section: string]: AppSection;
  } & { order: string[] };
  input_inputs: {
    [input: string]: AppInput;
  };
  input_layout: {
    [section: string]: Layout[];
  };
  output_html: string;
}
