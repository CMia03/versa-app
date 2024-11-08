const ItemData: any[] = [
    {
      id: 1,
      title: "Gâteau au chocolat",
      description: "Un gâteau au chocolat délicieux et facile à préparer.",
      ingredients: [
        '2 tasses de farine',
        '1 tasse de sucre',
        '1/2 tasse de cacao en poudre',
        '1 cuil. à café de levure chimique',
        '1/2 cuil. à café de sel',
        '2 œufs',
        '1 tasse de lait',
        '1/2 tasse d\'huile végétale',
        '1 cuil. à café d\'extrait de vanille',
      ],
      instructions: [
        'Préchauffer le four à 175°C (350°F).',
        'Graisser et fariner un moule de 23 cm.',
        'Dans un grand bol, mélanger les ingrédients secs.',
        'Ajouter les ingrédients liquides et mélanger jusqu\'à obtenir une pâte lisse.',
        'Verser la pâte dans le moule préparé.',
        'Cuire pendant 30-35 minutes ou jusqu\'à ce qu\'un cure-dent en ressorte propre.',
        'Laisser refroidir avant de servir.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 2,
      title: "Tarte aux pommes",
      description: "Une délicieuse tarte aux pommes classique.",
      ingredients: [
        '1 pâte brisée',
        '4 pommes',
        '100g de sucre',
        '1 cuil. à soupe de cannelle',
        '30g de beurre',
        '1 cuil. à soupe de farine',
      ],
      instructions: [
        'Préchauffer le four à 180°C (350°F).',
        'Éplucher et couper les pommes en tranches fines.',
        'Dans une poêle, faire fondre le beurre et ajouter les pommes.',
        'Saupoudrer de sucre et de cannelle, puis cuire à feu doux pendant 10 minutes.',
        'Étaler la pâte brisée dans un moule à tarte.',
        'Ajouter les pommes cuites sur la pâte, puis saupoudrer de farine.',
        'Cuire au four pendant 25-30 minutes.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 3,
      title: "Salade César",
      description: "Une salade César avec une sauce maison.",
      ingredients: [
        '1 laitue romaine',
        '100g de poulet grillé',
        '50g de parmesan râpé',
        '50g de croûtons',
        '3 cuil. à soupe de mayonnaise',
        '1 cuil. à soupe de moutarde',
        '1 cuil. à soupe de vinaigre',
        '1 gousse d\'ail émincée',
      ],
      instructions: [
        'Laver et couper la laitue romaine.',
        'Mélanger la mayonnaise, la moutarde, le vinaigre et l\'ail pour la sauce.',
        'Ajouter le poulet grillé, le parmesan et les croûtons sur la laitue.',
        'Verser la sauce et mélanger.',
        'Servir immédiatement.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 4,  
      title: "Soupe de potiron",
      description: "Une soupe crémeuse au potiron pour l\'automne.",
      ingredients: [
        '1 potiron',
        '1 oignon',
        '1 carotte',
        '1 pomme de terre',
        '500 ml de bouillon de légumes',
        '200 ml de crème',
        'Sel et poivre',
      ],
      instructions: [
        'Peler et couper le potiron, l\'oignon, la carotte et la pomme de terre.',
        'Dans une grande casserole, faire revenir l\'oignon dans un peu d\'huile.',
        'Ajouter le potiron, la carotte et la pomme de terre, puis couvrir avec le bouillon.',
        'Cuire pendant 20-30 minutes jusqu\'à ce que les légumes soient tendres.',
        'Mixer la soupe jusqu\'à ce qu\'elle soit lisse, puis ajouter la crème.',
        'Saler et poivrer, puis servir chaud.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    // 8 nouvelles recettes ajoutées ci-dessous
    {
      id: 5,
      title: "Pâtes à la carbonara",
      description: "Une recette classique italienne avec des pâtes, des œufs, du fromage et du bacon.",
      ingredients: [
        '200g de pâtes',
        '100g de lardons',
        '2 œufs',
        '50g de parmesan râpé',
        '50g de pecorino râpé',
        'Poivre noir',
      ],
      instructions: [
        'Cuire les pâtes dans de l\'eau salée.',
        'Dans une poêle, faire revenir les lardons.',
        'Battre les œufs avec le fromage râpé et le poivre.',
        'Mélanger les pâtes avec les lardons, puis ajouter le mélange œufs-fromage.',
        'Servir immédiatement avec du parmesan râpé.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 6,  
      title: "Pizza Margherita",
      description: "Une pizza simple avec de la tomate, de la mozzarella et du basilic frais.",
      ingredients: [
        '1 pâte à pizza',
        '200g de sauce tomate',
        '150g de mozzarella',
        'Quelques feuilles de basilic frais',
        'Sel et huile d\'olive',
      ],
      instructions: [
        'Préchauffer le four à 220°C (425°F).',
        'Étaler la pâte à pizza et étaler la sauce tomate dessus.',
        'Ajouter la mozzarella en morceaux et les feuilles de basilic.',
        'Cuire la pizza pendant 10-12 minutes.',
        'Servir avec un filet d\'huile d\'olive.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 7,  
      title: "Quiche Lorraine",
      description: "Une quiche classique aux lardons, œufs et crème.",
      ingredients: [
        '1 pâte brisée',
        '200g de lardons',
        '3 œufs',
        '200ml de crème fraîche',
        '150g de fromage râpé',
        'Poivre et sel',
      ],
      instructions: [
        'Préchauffer le four à 180°C (350°F).',
        'Faire revenir les lardons dans une poêle.',
        'Battre les œufs avec la crème et le fromage râpé.',
        'Verser le mélange sur la pâte, puis ajouter les lardons.',
        'Cuire pendant 30-35 minutes.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 8,  
      title: "Chili con carne",
      description: "Un chili épicé avec du bœuf, des haricots et des épices.",
      ingredients: [
        '500g de viande hachée',
        '1 oignon',
        '1 boîte de haricots rouges',
        '1 boîte de tomates concassées',
        '1 cuil. à soupe de chili en poudre',
        'Sel et poivre',
      ],
      instructions: [
        'Faire revenir l\'oignon dans une poêle.',
        'Ajouter la viande hachée et cuire jusqu\'à ce qu\'elle soit dorée.',
        'Ajouter les haricots, les tomates, et les épices.',
        'Laisser mijoter pendant 20-30 minutes.',
        'Servir avec du riz ou des tortillas.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    {
      id: 9,
      title: "Lasagne",
      description: "Un plat italien classique avec des couches de pâtes, de viande et de sauce béchamel.",
      ingredients: [
        '12 feuilles de lasagne',
        '500g de viande hachée',
        '500ml de sauce tomate',
        '1 oignon',
        '200g de fromage râpé',
        '500ml de sauce béchamel',
      ],
      instructions: [
        'Préchauffer le four à 180°C (350°F).',
        'Faire revenir l\'oignon et la viande hachée.',
        'Ajouter la sauce tomate et laisser mijoter.',
        'Monter les lasagnes en alternant les couches de pâtes, viande, sauce béchamel et fromage.',
        'Cuire au four pendant 40-45 minutes.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    { 
      id: 10,  
      title: "Poulet rôti",
      description: "Un poulet rôti doré et juteux, servi avec des légumes.",
      ingredients: [
        '1 poulet entier',
        '2 carottes',
        '2 pommes de terre',
        '1 oignon',
        'Herbes de Provence',
        'Sel et poivre',
      ],
      instructions: [
        'Préchauffer le four à 200°C (400°F).',
        'Frotter le poulet avec des herbes et de l\'huile.',
        'Placer le poulet dans un plat et ajouter les légumes coupés.',
        'Cuire pendant 1 heure à 1 heure 15 minutes.',
        'Servir avec les légumes rôtis.',
      ],
      image: '',
      href: "/view-recipe/[id]" 
    },
    
]
  
  
  export default ItemData;
  