import Link from 'next/link';
import Layout from '../layout';
import { Typography } from "@/components/ui/Typography";
import { Code } from 'lucide-react';

export default function algoPages() {
  return (
    <Layout>
      <Typography variant="h3">Bienvenue sur la Plateforme d'Exercices d'Algorithmique <Code /></Typography>
      <Typography variant="p">Explorez des exercices pour améliorer vos compétences en programmation.</Typography>

      <Link href="/pages/exercices">
        <Typography variant="p" className="text-end text-blue-900 mt-10">
          Voir les Exercices
        </Typography>
      </Link>
    </Layout>
  );
}
