// data/games.ts
export const games = {
    collectiveGames: [
      {
        name: "Football",
        description: "Marquer des buts dans le but adverse en déplaçant un ballon avec les pieds.",
        rules: [
          "2 équipes de 11 joueurs.",
          "Le jeu commence avec un coup d'envoi au centre du terrain.",
          "Le but est de marquer en envoyant le ballon dans le but de l'adversaire.",
          "Le match dure généralement 90 minutes."
        ]
      },
      {
        name: "Basketball",
        description: "Marquer des points en lançant un ballon dans un panier élevé.",
        rules: [
          "2 équipes de 5 joueurs.",
          "Chaque équipe essaie de marquer des paniers.",
          "Le match dure généralement 48 minutes.",
          "Le premier à marquer le plus de points gagne."
        ]
      }
    ],
    individualGames: [
      {
        name: "Tennis",
        description: "Renvoie la balle pour empêcher ton adversaire de la renvoyer correctement.",
        rules: [
          "2 joueurs.",
          "Chaque joueur essaie de frapper la balle dans le terrain adverse.",
          "Un set est remporté par celui qui marque 6 jeux.",
          "Un match se joue généralement en 3 ou 5 sets."
        ]
      },
      {
        name: "Course à pied",
        description: "Courir sur une certaine distance le plus rapidement possible.",
        rules: [
          "Compétition contre le temps ou d'autres participants.",
          "Le parcours est généralement mesuré en kilomètres ou en miles.",
          "Le premier à franchir la ligne d’arrivée gagne."
        ]
      }
    ]
  };
  