import { Metadata } from "next";

interface Config extends Metadata {
    title: string;
    description: string;
    url: string;
}

export const config: Config = {
    title: 'Blog POC',
    description: 'SSG blog hosted on vercel',
    url: 'ak-blogpoc.vercel.app',
}