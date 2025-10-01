
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Inflables Infantiles',
    slug: 'inflables-infantiles',
    description: 'Diversión segura para los más pequeños con variedad de motivos y tamaños',
    image: 'https://i.ytimg.com/vi/mvQDpwlH72w/hq720_2.jpg',
    order: 1
  },
  {
    name: 'Mega Inflables',
    slug: 'mega-inflables',
    description: 'Atracciones exclusivas que marcarán la diferencia en tu evento',
    image: 'https://i.ytimg.com/vi/y_vxe0ijZNA/maxresdefault.jpg',
    order: 2
  },
  {
    name: 'Inflables Acuáticos',
    slug: 'inflables-acuaticos',
    description: 'Diversión refrescante para los días calurosos',
    image: 'https://i.ytimg.com/vi/OoaK2txi0-k/maxresdefault.jpg',
    order: 3
  },
  {
    name: 'Atracciones Mecánicas',
    slug: 'atracciones-mecanicas',
    description: 'Experiencias únicas con atracciones exclusivas en la ciudad',
    image: 'https://live.staticflickr.com/5478/31280669425_70c8a19bc4_b.jpg',
    order: 4
  },
  {
    name: 'Juegos Extremos',
    slug: 'juegos-extremos',
    description: 'Adrenalina y diversión para adolescentes y adultos',
    image: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
    order: 5
  }
]

const services = [
  // Inflables Infantiles
  {
    name: 'Castillo Princesas',
    slug: 'castillo-princesas',
    description: 'Hermoso castillo inflable temático de princesas, perfecto para fiestas infantiles. Incluye área de salto segura y colorida decoración.',
    shortDesc: 'Castillo temático de princesas para niñas',
    categorySlug: 'inflables-infantiles',
    features: ['Área de salto segura', 'Decoración temática', 'Colores vibrantes', 'Tamaño mediano'],
    ageRange: '3-10 años',
    space: 'Abierto o Cerrado',
    images: [
      {
        url: 'https://i.ytimg.com/vi/mvQDpwlH72w/hq720_2.jpg',
        alt: 'Castillo inflable de princesas - vista principal'
      },
      {
        url: 'https://i.pinimg.com/originals/60/85/8d/60858d1d1d9fb740b37c01b0c08aa977.jpg',
        alt: 'Castillo de princesas - niñas jugando'
      },
      {
        url: 'https://i.pinimg.com/originals/8c/3b/78/8c3b78c74e1fe74843d2f949d889c1f7.jpg',
        alt: 'Castillo de princesas - instalación interior'
      },
      {
        url: 'https://i.pinimg.com/originals/86/af/7b/86af7baad1c5c49c5eae03c68c7337e3.jpg',
        alt: 'Castillo de princesas - detalles decorativos'
      }
    ]
  },
  {
    name: 'Tobogán Dinosaurios',
    slug: 'tobogan-dinosaurios',
    description: 'Tobogán inflable con temática de dinosaurios que transportará a los niños a la era jurásica. Diversión y aventura garantizada.',
    shortDesc: 'Tobogán temático de dinosaurios para aventureros',
    categorySlug: 'inflables-infantiles',
    features: ['Tobogán alto', 'Temática jurásica', 'Área de aterrizaje suave', 'Muy popular'],
    ageRange: '4-12 años',
    space: 'Abierto o Cerrado',
    images: [
      {
        url: 'https://i.ytimg.com/vi/sbduqbbsQwk/maxresdefault.jpg',
        alt: 'Tobogán inflable de dinosaurios - vista principal'
      },
      {
        url: 'https://i.ytimg.com/vi/W6utqp7WK_M/maxresdefault.jpg',
        alt: 'Tobogán dinosaurios - niños subiendo'
      },
      {
        url: 'https://i5.walmartimages.com/seo/XJUMP-T-Rex-Dinosaur-Inflatable-Water-Slide-Bounce-House-Combo-with-Splash-Pool-for-Kids-and-Adults-with-Air-Blower-Commercial-Grade_d003f1e9-adf2-49f9-8238-1928fcca4cc7.5d9483cdbd80689b6d2c12a44c9288f2.jpeg',
        alt: 'Tobogán dinosaurios - niños deslizándose'
      },
      {
        url: 'https://i.pinimg.com/originals/bc/f3/e0/bcf3e02d1e083aefe04e1157b90931be.jpg',
        alt: 'Tobogán dinosaurios - temática T-Rex'
      }
    ]
  },
  // Mega Inflables
  {
    name: 'Mega Obstáculos JALM',
    slug: 'mega-obstaculos-jalm',
    description: 'Impresionante circuito de obstáculos inflables que desafiará a participantes de todas las edades. Incluye múltiples secciones de escalada, túneles y toboganes.',
    shortDesc: 'Circuito de obstáculos gigante para competencias',
    categorySlug: 'mega-inflables',
    features: ['Circuito completo', 'Múltiples obstáculos', 'Para competencias', 'Muy popular'],
    ageRange: '6+ años',
    space: 'Abierto preferiblemente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
        alt: 'Mega obstáculos JALM - circuito completo'
      },
      {
        url: 'https://i.pinimg.com/736x/f0/df/cd/f0dfcd2c4e71d2699e74e613dbe3cacf.jpg',
        alt: 'Mega obstáculos - paredes de escalada'
      },
      {
        url: 'https://i.ytimg.com/vi/gxt3T2VlWhQ/maxresdefault.jpg',
        alt: 'Mega obstáculos - competencia en acción'
      },
      {
        url: 'https://i.ytimg.com/vi/k2Z1lHw54dE/maxresdefault.jpg',
        alt: 'Mega obstáculos - vista aérea'
      },
      {
        url: 'https://i.ytimg.com/vi/NetMsrkyMMM/maxresdefault.jpg',
        alt: 'Mega obstáculos - línea de meta'
      }
    ]
  },
  {
    name: 'Mega Tobogán Gigante',
    slug: 'mega-tobogan-gigante',
    description: 'El tobogán inflable más alto de Medellín. Una experiencia emocionante con múltiples carriles para competencias entre amigos.',
    shortDesc: 'Tobogán gigante de múltiples carriles',
    categorySlug: 'mega-inflables',
    features: ['Altura máxima', 'Múltiples carriles', 'Para competencias', 'Exclusivo JALM'],
    ageRange: '8+ años',
    space: 'Abierto únicamente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/sbduqbbsQwk/maxresdefault.jpg',
        alt: 'Mega tobogán gigante - vista completa'
      },
      {
        url: 'https://i.pinimg.com/736x/30/2c/b2/302cb243f472e5ccc556117ea9290681.jpg',
        alt: 'Mega tobogán - múltiples carriles'
      },
      {
        url: 'https://i.ytimg.com/vi/nL7tFv9uHC8/maxresdefault.jpg',
        alt: 'Mega tobogán - niños compitiendo'
      },
      {
        url: 'https://i.ytimg.com/vi/Uz4dKloCLi0/maxresdefault.jpg',
        alt: 'Mega tobogán - comparación de altura'
      }
    ]
  },
  // Inflables Acuáticos
  {
    name: 'Tobogán Acuático Premium',
    slug: 'tobogan-acuatico-premium',
    description: 'Tobogán acuático de gran altura con piscina de aterrizaje. Perfecto para refrescarse en los días calurosos de Medellín.',
    shortDesc: 'Tobogán acuático con piscina incluida',
    categorySlug: 'inflables-acuaticos',
    features: ['Tobogán alto', 'Piscina incluida', 'Sistema de agua', 'Refrescante'],
    ageRange: '6+ años',
    space: 'Abierto únicamente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/OoaK2txi0-k/maxresdefault.jpg',
        alt: 'Tobogán acuático premium - vista principal'
      },
      {
        url: 'https://i.pinimg.com/originals/a9/47/22/a94722619f9a603204f188cfeeb6172f.jpg',
        alt: 'Tobogán acuático - piscina de aterrizaje'
      },
      {
        url: 'https://as2.ftcdn.net/v2/jpg/06/44/02/73/1000_F_644027339_cDCl4pRTfvzeNvG3fWptla5JyHndIrlr.jpg',
        alt: 'Tobogán acuático - niños deslizándose'
      },
      {
        url: 'https://i.pinimg.com/originals/b2/67/06/b26706451d431b0b932e7813677d3376.jpg',
        alt: 'Tobogán acuático - sistema completo'
      }
    ]
  },
  {
    name: 'Parque Acuático Inflable',
    slug: 'parque-acuatico-inflable',
    description: 'Completo parque acuático inflable con múltiples atracciones, toboganes y juegos de agua. La diversión acuática más completa.',
    shortDesc: 'Parque acuático completo con múltiples atracciones',
    categorySlug: 'inflables-acuaticos',
    features: ['Múltiples atracciones', 'Juegos variados', 'Sistema completo', 'Para grupos grandes'],
    ageRange: '4+ años',
    space: 'Abierto únicamente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/BeV1eyoiJ7o/maxresdefault.jpg',
        alt: 'Parque acuático inflable - vista general'
      },
      {
        url: 'https://i.pinimg.com/originals/7b/f0/89/7bf089aebdd140608fa2c8b994e1fd72.jpg',
        alt: 'Parque acuático - múltiples atracciones'
      },
      {
        url: 'https://i.pinimg.com/736x/bc/8e/f5/bc8ef5055a4d8c526df7d85b76546a62.jpg',
        alt: 'Parque acuático - niños jugando'
      },
      {
        url: 'https://i.pinimg.com/originals/40/bf/93/40bf93e262ab9034f34e463729fadf45.png',
        alt: 'Parque acuático - vista aérea completa'
      },
      {
        url: 'https://images-na.ssl-images-amazon.com/images/I/715gzjk-3HL.jpg',
        alt: 'Parque acuático - zonas de obstáculos'
      }
    ]
  },
  // Atracciones Mecánicas
  {
    name: 'Big Twist Mecánico',
    slug: 'big-twist-mecanico',
    description: 'Atracción mecánica giratoria que ofrece una experiencia emocionante y segura. Exclusiva en Medellín con JALM.',
    shortDesc: 'Atracción mecánica giratoria exclusiva',
    categorySlug: 'atracciones-mecanicas',
    features: ['Atracción exclusiva', 'Totalmente segura', 'Experiencia única', 'Para adolescentes'],
    ageRange: '8+ años',
    space: 'Abierto únicamente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/V7tQe2BqVUs/maxresdefault.jpg',
        alt: 'Big Twist mecánico - atracción principal'
      },
      {
        url: 'https://c8.alamy.com/comp/E188KJ/people-spinning-in-air-hanging-in-chairs-on-a-carnival-ride-E188KJ.jpg',
        alt: 'Big Twist - en funcionamiento'
      },
      {
        url: 'https://i.pinimg.com/736x/85/a3/43/85a34343e2b98c994168fa7f5031f505.jpg',
        alt: 'Big Twist - instalación completa'
      },
      {
        url: 'https://i.ytimg.com/vi/z2QTBgZfXr8/maxresdefault.jpg',
        alt: 'Big Twist - personas disfrutando'
      }
    ]
  },
  {
    name: 'Rueda de la Fortuna Mini',
    slug: 'rueda-fortuna-mini',
    description: 'Rueda de la fortuna especialmente diseñada para eventos privados. Ofrece vistas panorámicas y diversión familiar.',
    shortDesc: 'Rueda de la fortuna para eventos privados',
    categorySlug: 'atracciones-mecanicas',
    features: ['Vista panorámica', 'Para toda la familia', 'Segura y divertida', 'Fotos espectaculares'],
    ageRange: '5+ años',
    space: 'Abierto únicamente',
    images: [
      {
        url: 'https://live.staticflickr.com/5478/31280669425_70c8a19bc4_b.jpg',
        alt: 'Rueda de la fortuna mini - vista completa'
      },
      {
        url: 'https://images.pexels.com/photos/19065208/pexels-photo-19065208/free-photo-of-colorful-gondolas-of-the-ferris-wheel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Rueda de la fortuna - góndolas coloridas'
      },
      {
        url: 'https://wallpaperaccess.com/full/4029311.jpg',
        alt: 'Rueda de la fortuna - vista nocturna'
      },
      {
        url: 'https://i.ytimg.com/vi/Lig1YsWDbuI/maxresdefault.jpg',
        alt: 'Rueda de la fortuna - familias disfrutando'
      }
    ]
  },
  // Juegos Extremos
  {
    name: 'Gladiadores Extremo',
    slug: 'gladiadores-extremo',
    description: 'Competencia de gladiadores sobre plataforma elevada. Los participantes deben derribar a su oponente usando bastones acolchados.',
    shortDesc: 'Competencia de gladiadores sobre plataforma',
    categorySlug: 'juegos-extremos',
    features: ['Competencia emocionante', 'Para adolescentes/adultos', 'Bastones acolchados', 'Muy popular'],
    ageRange: '12+ años',
    space: 'Abierto o Cerrado',
    images: [
      {
        url: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
        alt: 'Gladiadores extremo - competencia principal'
      },
      {
        url: 'https://i.ytimg.com/vi/MaqUEYAGMo4/maxresdefault.jpg',
        alt: 'Gladiadores - batalla en plataforma'
      },
      {
        url: 'https://i.pinimg.com/originals/7b/eb/fc/7bebfc8b7a9614f04ad53178ff7d8d7c.jpg',
        alt: 'Gladiadores - arena de combate'
      },
      {
        url: 'https://i.ytimg.com/vi/OdGvC_R4RIs/maxresdefault.jpg',
        alt: 'Gladiadores - competencia con público'
      }
    ]
  },
  {
    name: 'Bungee Run Competencia',
    slug: 'bungee-run-competencia',
    description: 'Carrera con arnés elástico donde los participantes compiten por llegar más lejos contra la resistencia del bungee.',
    shortDesc: 'Carrera con arnés elástico competitiva',
    categorySlug: 'juegos-extremos',
    features: ['Carrera competitiva', 'Arnés seguro', 'Para adultos', 'Adrenalina pura'],
    ageRange: '15+ años',
    space: 'Abierto preferiblemente',
    images: [
      {
        url: 'https://i.ytimg.com/vi/rq7zDCPcfto/maxresdefault.jpg',
        alt: 'Bungee run competencia - carrera principal'
      },
      {
        url: 'https://i.ytimg.com/vi/b5ujKcDUUQ0/maxresdefault.jpg',
        alt: 'Bungee run - participantes compitiendo'
      },
      {
        url: 'https://i.ytimg.com/vi/JYW-1Kpl3_4/maxresdefault.jpg',
        alt: 'Bungee run - estirado del cordón'
      },
      {
        url: 'https://www.asiainflatables.com/uploadfile/201706/28/cc5ea7399662bbe876cccd056b1d6551_medium.jpg',
        alt: 'Bungee run - equipo y configuración'
      }
    ]
  }
]

const packages = [
  {
    name: 'Desafío de Guerreros JALM',
    slug: 'desafio-guerreros-jalm',
    description: 'Contiene pruebas de destreza física y mental, donde se mide el grado de habilidad para vencer diferentes obstáculos. Algunas actividades son: Las atarrayas, arrastre bajo, triki salvaje, cascos jarra, pruebas de relevos, juegos de habilidades, entre otras.',
    shortDesc: 'Pruebas de destreza física y mental con obstáculos desafiantes',
    duration: '3 horas',
    basesCount: 5,
    ageRange: '6+ años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Las atarrayas', 'Arrastre bajo', 'Triki salvaje', 'Cascos jarra', 'Pruebas de relevos', 'Juegos de habilidades'],
    isFeatured: true,
    images: [
      {
        url: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
        alt: 'Desafío de guerreros JALM - actividades principales'
      },
      {
        url: 'https://i.pinimg.com/originals/54/cf/bc/54cfbc8e4cd156be885fedaba23e4f69.jpg',
        alt: 'Desafío guerreros - retos en equipo'
      },
      {
        url: 'https://i.pinimg.com/originals/73/12/cd/7312cdc457ec47fbcbbb3cfc2f6a57d8.jpg',
        alt: 'Desafío guerreros - escalada en cuerdas'
      },
      {
        url: 'https://i.pinimg.com/originals/f4/7d/88/f47d8839050d549b3676624d18d17b7d.jpg',
        alt: 'Desafío guerreros - pruebas de equilibrio'
      }
    ]
  },
  {
    name: 'Desafío Premium JALM',
    slug: 'desafio-premium-jalm',
    description: 'Incluye 1 Mega Inflable, además contiene pruebas de destreza física y mental, donde se mide el grado de habilidad para vencer diferentes retos de destreza en obstáculos y agilidad mental. Algunas actividades son: Las atarrayas, arrastre bajo, triki salvaje, cascos jarra, pruebas de relevos, juegos de habilidades, entre otras.',
    shortDesc: 'La experiencia más completa con mega inflable y remate musical',
    duration: '4 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: true,
    includeMusicalFinale: true,
    activities: ['Mega Inflable', 'Las atarrayas', 'Arrastre bajo', 'Triki salvaje', 'Cascos jarra', 'Pruebas de relevos', 'Juegos de habilidades', 'Remate Musical'],
    isFeatured: true,
    images: [
      {
        url: 'https://i.ytimg.com/vi/y_vxe0ijZNA/maxresdefault.jpg',
        alt: 'Desafío Premium JALM - experiencia completa'
      },
      {
        url: 'https://i.pinimg.com/736x/cf/1d/44/cf1d449c9590a8bfef1fd52e83fa8c39.jpg',
        alt: 'Desafío Premium - mega inflable'
      },
      {
        url: 'https://i.ytimg.com/vi/PEGsIcj30ks/maxresdefault.jpg',
        alt: 'Desafío Premium - remate musical'
      },
      {
        url: 'https://i.pinimg.com/originals/56/94/66/569466987b9e33ae3322017ae5ae1ce6.png',
        alt: 'Desafío Premium - montaje completo'
      },
      {
        url: 'https://i.pinimg.com/originals/a2/e5/e5/a2e5e534b3b2b0ecc1d565a2d4663ac4.png',
        alt: 'Desafío Premium - actividades en equipo'
      }
    ]
  },
  {
    name: 'Juegos Múltiples',
    slug: 'juegos-multiples',
    description: 'Incluye 1 Mega Inflable. Contiene pruebas de destreza física y mental, donde se mide el grado de habilidad para vencer diferentes obstáculos. Algunas actividades son: Carrera de cien pies, Gusanos infinitos, barras de equilibrio, Boleibomba, entre otros.',
    shortDesc: 'Mega inflable con pruebas variadas de destreza',
    duration: '3 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: true,
    includeMusicalFinale: false,
    activities: ['Mega Inflable', 'Carrera de cien pies', 'Gusanos infinitos', 'Barras de equilibrio', 'Boleibomba'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/rq7zDCPcfto/maxresdefault.jpg',
        alt: 'Juegos Múltiples - actividades variadas'
      },
      {
        url: 'https://i.pinimg.com/originals/8d/7b/6e/8d7b6eaa98ed632ff3068a4d4f1fcce7.jpg',
        alt: 'Juegos Múltiples - gusanos infinitos'
      },
      {
        url: 'https://i.pinimg.com/originals/6a/b2/1f/6ab21fe8fd7d66da2a60bf781817b175.jpg',
        alt: 'Juegos Múltiples - barras equilibrio'
      },
      {
        url: 'https://i.ytimg.com/vi/sT5xAPg_ldQ/maxresdefault.jpg',
        alt: 'Juegos Múltiples - mega inflable'
      }
    ]
  },
  {
    name: 'Juegos Múltiples Premium JALM',
    slug: 'juegos-multiples-premium-jalm',
    description: 'Incluye 1 Mega Inflable. Contiene pruebas de destreza física y mental, donde se mide el grado de habilidad para vencer diferentes obstáculos. Algunas actividades son: obstáculos con equilibrio, pruebas de relevos, juegos de habilidades.',
    shortDesc: 'Versión premium con mega inflable y remate musical',
    duration: '4 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: true,
    includeMusicalFinale: true,
    activities: ['Mega Inflable', 'Obstáculos con equilibrio', 'Pruebas de relevos', 'Juegos de habilidades', 'Remate Musical'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/y_vxe0ijZNA/maxresdefault.jpg',
        alt: 'Juegos Múltiples Premium - versión completa'
      },
      {
        url: 'https://i.pinimg.com/736x/b3/92/c8/b392c87f5f2ebf3a5b3e32f044ef3c6b--outdoor-activities-for-kids-relay-games-for-kids-outdoor.jpg',
        alt: 'Juegos Múltiples Premium - relevos'
      },
      {
        url: 'https://i.pinimg.com/originals/7d/82/47/7d824713419296ac1d924460481f853c.jpg',
        alt: 'Juegos Múltiples Premium - equilibrio'
      },
      {
        url: 'https://i.ytimg.com/vi/1aw7F9Zpec8/maxresdefault.jpg',
        alt: 'Juegos Múltiples Premium - finale musical'
      }
    ]
  },
  {
    name: 'Feria de Bases Recreativa',
    slug: 'feria-bases-recreativa',
    description: 'La Feria ofrece diferentes bases de concurso con juegos autóctonos de algunas de nuestras regiones. Podemos encontrar bases como: la rana, tejo, tragabolas, sapodromo, tiro al blanco, concéntrese, triqui, entre otros. Tenemos bases Premium como: Tiro Gol, Billar Gol, Skee Ball, Paint Ball, Hula Hoops. Cada participante recibe billetes ficticios, los cuales podrá redimir por premios suministrados por el cliente.',
    shortDesc: 'Feria tradicional con juegos autóctonos y premios',
    duration: '3-4 horas',
    basesCount: null,
    ageRange: 'Todas las edades',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['La rana', 'Tejo', 'Tragabolas', 'Sapodromo', 'Tiro al blanco', 'Tiro Gol', 'Billar Gol', 'Skee Ball', 'Billetes ficticios', 'Sistema de premios'],
    isFeatured: true,
    images: [
      {
        url: 'https://i.ytimg.com/vi/mvQDpwlH72w/hq720_2.jpg',
        alt: 'Feria de Bases Recreativa - juegos tradicionales'
      },
      {
        url: 'https://i.pinimg.com/736x/09/d3/e3/09d3e363931fa64314ab8e558ec37f89--fall-carnival-carnival-games.jpg',
        alt: 'Feria Bases - juegos de puntería'
      },
      {
        url: 'https://i.pinimg.com/originals/17/eb/16/17eb16876a21608c89790693cf6eaa85.jpg',
        alt: 'Feria Bases - familias jugando'
      },
      {
        url: 'https://i.pinimg.com/originals/79/2c/b9/792cb90de4f59dd0369ae33d452a693c.jpg',
        alt: 'Feria Bases - juegos premium'
      },
      {
        url: 'https://i.pinimg.com/originals/ec/f8/9c/ecf89c09e0ecb7a6828e0789a3e0a4f3.jpg',
        alt: 'Feria Bases - canje de premios'
      }
    ]
  },
  {
    name: 'Fiesta de Aventura',
    slug: 'fiesta-aventura',
    description: 'Ofrecemos una tarde llena de diversión y aventura con diferentes actividades que tienen como objetivo la búsqueda de un tesoro de dulces. Para poderlo encontrar los niños deben seguir diferentes pistas activas como carrera de caballitos, pasos con cuerdas, pasos con obstáculo. Cada pista los llevará más cerca del tesoro.',
    shortDesc: 'Búsqueda del tesoro con pistas y actividades',
    duration: '3 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Búsqueda del tesoro', 'Carrera de caballitos', 'Pasos con cuerdas', 'Pasos con obstáculo', 'Pistas activas', 'Tesoro de dulces'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
        alt: 'Fiesta de Aventura - búsqueda del tesoro'
      },
      {
        url: 'https://i.pinimg.com/originals/2d/11/82/2d1182bd95cd4c552e36af65cb277ea7.png',
        alt: 'Fiesta Aventura - siguiendo pistas'
      },
      {
        url: 'https://thumbs.dreamstime.com/z/child-adventure-park-kids-climbing-rope-trail-forest-climb-high-agility-outdoor-amusement-center-children-little-127963850.jpg',
        alt: 'Fiesta Aventura - curso de cuerdas'
      },
      {
        url: 'https://s-media-cache-ak0.pinimg.com/736x/aa/e2/0d/aae20d88ae0aed0772787e843826ceaa.jpg',
        alt: 'Fiesta Aventura - tesoro encontrado'
      }
    ]
  },
  {
    name: 'Pool Party',
    slug: 'pool-party',
    description: 'Divertida jornada de juegos con agua, en tierra y en piscina, donde se podrá disfrutar de competencias, retos individuales, trabajo en equipo entre otros.',
    shortDesc: 'Diversión acuática con juegos en tierra y piscina',
    duration: '3 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto únicamente',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Juegos con agua', 'Competencias acuáticas', 'Retos individuales', 'Trabajo en equipo', 'Juegos en piscina', 'Juegos en tierra'],
    isFeatured: true,
    images: [
      {
        url: 'https://i.ytimg.com/vi/OoaK2txi0-k/maxresdefault.jpg',
        alt: 'Pool Party - diversión acuática'
      },
      {
        url: 'https://i.pinimg.com/originals/4a/dc/d6/4adcd6d1fa22d98cbad90309a09a24c8.jpg',
        alt: 'Pool Party - juegos en piscina'
      },
      {
        url: 'https://i.pinimg.com/originals/44/6e/a6/446ea640a3218719a4ea40250c5febcb.png',
        alt: 'Pool Party - zona de chapoteo'
      },
      {
        url: 'https://thumbs.dreamstime.com/z/children-swimming-competition-pool-relay-race-153875458.jpg',
        alt: 'Pool Party - competencias acuáticas'
      },
      {
        url: 'https://i.pinimg.com/originals/61/e0/ab/61e0ab87b92f625533993940bbfd507b.jpg',
        alt: 'Pool Party - juegos con globos de agua'
      }
    ]
  },
  {
    name: 'Parque Interactivo',
    slug: 'parque-interactivo',
    description: 'Pensando en brindarle un espacio recreativo a los más pequeños, hemos diseñado un montaje lleno de magia y color. En el parque interactivo encontraremos inflables, lonita saltarina, pelotas, animalitos saltarines, túneles, legos, balancines y una serie de elementos que brindan toda la diversión y estimulación adecuada para su edad.',
    shortDesc: 'Espacio especial para los más pequeños con estimulación',
    duration: '3 horas',
    basesCount: null,
    ageRange: '1-5 años',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Inflables pequeños', 'Lonita saltarina', 'Pelotas', 'Animalitos saltarines', 'Túneles', 'Legos', 'Balancines', 'Estimulación temprana'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/mvQDpwlH72w/hq720_2.jpg',
        alt: 'Parque Interactivo - espacio para pequeños'
      },
      {
        url: 'https://i.pinimg.com/736x/4d/7d/fb/4d7dfb2dd7e03f455871f7445ab8a1a2.jpg',
        alt: 'Parque Interactivo - inflables pequeños'
      },
      {
        url: 'https://i.ytimg.com/vi/HcdWy04u9xs/maxresdefault.jpg',
        alt: 'Parque Interactivo - pelotas y juegos'
      },
      {
        url: 'https://i.pinimg.com/originals/6d/b0/2f/6db02f673e9e8d5b2f98db066c08ee78.jpg',
        alt: 'Parque Interactivo - animalitos saltarines'
      },
      {
        url: 'https://i.pinimg.com/originals/11/ab/2c/11ab2cc33516437e9065476765b4610b.jpg',
        alt: 'Parque Interactivo - túneles y estimulación'
      }
    ]
  },
  {
    name: 'Zona de Comandos',
    slug: 'zona-comandos',
    description: 'Programa especial para que los niños disfruten de una experiencia al estilo militar, donde se pondrá a prueba tanto física como mentalmente, afrontando diferentes retos de acondicionamiento militar, bases terrestres, puntería, bombardeo con bombas de agua, combates, entre otras.',
    shortDesc: 'Experiencia militar con retos y bombardeo acuático',
    duration: '3 horas',
    basesCount: 6,
    ageRange: '6+ años',
    space: 'Abierto únicamente',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Estilo militar', 'Acondicionamiento', 'Bases terrestres', 'Puntería', 'Bombardeo con agua', 'Combates', 'Retos físicos y mentales'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/rq7zDCPcfto/maxresdefault.jpg',
        alt: 'Zona de Comandos - experiencia militar'
      },
      {
        url: 'https://i.pinimg.com/originals/3b/04/f2/3b04f2410d7f8b466e0e1a13881a28af.jpg',
        alt: 'Zona Comandos - entrenamiento militar'
      },
      {
        url: 'https://i.pinimg.com/originals/1f/f8/5c/1ff85c30e0bded615d80d837c7a87d2b.jpg',
        alt: 'Zona Comandos - bombardeo con agua'
      },
      {
        url: 'https://i.pinimg.com/originals/54/56/a3/5456a3ddf780ef5e89b5f6e979d9d0f3.png',
        alt: 'Zona Comandos - práctica de puntería'
      }
    ]
  },
  {
    name: 'Carrera de Observación',
    slug: 'carrera-observacion',
    description: 'Esta actividad se realiza mediante el montaje de diferentes bases, donde los participantes deben trabajar en equipo para conseguir las pistas que los llevará a la siguiente base. Cada base contiene adivinanzas y acertijos que se revelarán mediante la superación de cada prueba y a medida que cada base sea superada el equipo debe ir registrando el mejor tiempo posible.',
    shortDesc: 'Trabajo en equipo con pistas, acertijos y cronometraje',
    duration: '3-4 horas',
    basesCount: 6,
    ageRange: '6+ años, Adolescentes y Adultos',
    space: 'Abierto únicamente',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Trabajo en equipo', 'Pistas', 'Adivinanzas', 'Acertijos', 'Cronometraje', 'Competencia por tiempo'],
    isFeatured: false,
    images: [
      {
        url: 'https://i.ytimg.com/vi/JtqbJAP7Qe0/maxresdefault.jpg',
        alt: 'Carrera de Observación - trabajo en equipo'
      },
      {
        url: 'https://i.ytimg.com/vi/gtCXeXBkVik/maxresdefault.jpg',
        alt: 'Carrera Observación - resolviendo acertijos'
      },
      {
        url: 'https://i.pinimg.com/originals/8d/6f/df/8d6fdf50d74b83e730810976d5aabcc5.jpg',
        alt: 'Carrera Observación - siguiendo pistas'
      },
      {
        url: 'https://i.pinimg.com/originals/b1/84/a9/b184a9696add4fae61135d0c10d6aae4.png',
        alt: 'Carrera Observación - desafíos grupales'
      }
    ]
  },
  {
    name: 'Gran Casino JALM',
    slug: 'gran-casino-jalm',
    description: 'Contamos con diferentes bases de apuestas y juegos de azar. Podemos encontrar bases como: Black Jack, Ruleta, Bingo, Remix, Billar Gol entre otros. Cada participante recibe billetes ficticios, los cuales podrá redimir por premios suministrados por el cliente.',
    shortDesc: 'Casino completo con juegos de azar y premios',
    duration: '3-4 horas',
    basesCount: null,
    ageRange: 'Adolescentes y Adultos',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Black Jack', 'Ruleta', 'Bingo', 'Remix', 'Billar Gol', 'Billetes ficticios', 'Sistema de premios', 'Juegos de azar'],
    isFeatured: true,
    images: [
      {
        url: 'https://i.ytimg.com/vi/y_vxe0ijZNA/maxresdefault.jpg',
        alt: 'Gran Casino JALM - juegos de azar'
      },
      {
        url: 'https://thumbs.dreamstime.com/z/black-jack-table-poker-chips-fake-money-casino-themed-party-event-rows-coloured-poker-chips-casino-themed-party-182095663.jpg',
        alt: 'Gran Casino - mesas de juego'
      },
      {
        url: 'https://i.pinimg.com/originals/aa/a0/6d/aaa06dbdb404389acdc57addf5244856.jpg',
        alt: 'Gran Casino - bingo en acción'
      },
      {
        url: 'https://i.ytimg.com/vi/EGH6VWkELro/maxresdefault.jpg',
        alt: 'Gran Casino - adolescentes jugando'
      },
      {
        url: 'https://i.ytimg.com/vi/5eJeQKf1QfM/maxresdefault.jpg',
        alt: 'Gran Casino - canje de fichas'
      }
    ]
  },
  {
    name: 'Eventos Corporativos',
    slug: 'eventos-corporativos',
    description: 'Al finalizar cada base se obtendrá una reflexión de los valores corporativos que la empresa solicite tales como: Escucha Activa, Trabajo en Equipo, Liderazgo, Comunicación, Negociación, entre otros.',
    shortDesc: 'Team building con reflexiones sobre valores corporativos',
    duration: '3-4 horas',
    basesCount: 6,
    ageRange: 'Adultos',
    space: 'Abierto o Cerrado',
    includeMegaInflatable: false,
    includeMusicalFinale: false,
    activities: ['Team building', 'Escucha activa', 'Trabajo en equipo', 'Liderazgo', 'Comunicación', 'Negociación', 'Reflexiones corporativas'],
    isFeatured: true,
    images: [
      {
        url: 'https://live.staticflickr.com/5478/31280669425_70c8a19bc4_b.jpg',
        alt: 'Eventos Corporativos - team building'
      },
      {
        url: 'https://pbs.twimg.com/media/DdhEvNsX0AARwQq.jpg',
        alt: 'Eventos Corporativos - actividades de equipo'
      },
      {
        url: 'https://i.pinimg.com/736x/ff/b5/cd/ffb5cdbda22e6db32b9b83a9aa481a6f.jpg',
        alt: 'Eventos Corporativos - ejercicios de liderazgo'
      },
      {
        url: 'https://www.betterup.com/hubfs/Blog%20Images/problem%20solving%20strategies/team-working-around-table-problem-solving-strategies.jpg',
        alt: 'Eventos Corporativos - resolución de problemas'
      },
      {
        url: 'https://dialoguecircles.com/wp-content/uploads/2009/10/bigstock-Business-Team-Meeting-291-KB-110074352-copy.jpg',
        alt: 'Eventos Corporativos - reflexión de valores'
      }
    ]
  }
]

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Clear existing data
  console.log('🗑️  Limpiando datos existentes...')
  await prisma.image.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.package.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.contactRequest.deleteMany({})

  // Create categories
  console.log('📁 Creando categorías...')
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category
      })
    )
  )

  console.log(`✅ ${createdCategories.length} categorías creadas`)

  // Create services
  console.log('🛠️  Creando servicios...')
  for (const service of services) {
    const category = createdCategories.find(c => c.slug === service.categorySlug)
    if (!category) {
      console.log(`❌ Categoría no encontrada: ${service.categorySlug}`)
      continue
    }

    const createdService = await prisma.service.create({
      data: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        shortDesc: service.shortDesc,
        categoryId: category.id,
        features: service.features,
        ageRange: service.ageRange,
        space: service.space,
        isActive: true
      }
    })

    // Add images for service
    for (let index = 0; index < service.images.length; index++) {
      const image = service.images[index]
      await prisma.image.create({
        data: {
          url: image.url,
          alt: image.alt,
          order: index,
          serviceId: createdService.id
        }
      })
    }
  }

  console.log(`✅ ${services.length} servicios creados`)

  // Create packages
  console.log('📦 Creando paquetes...')
  for (const pkg of packages) {
    const createdPackage = await prisma.package.create({
      data: {
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        shortDesc: pkg.shortDesc,
        duration: pkg.duration,
        basesCount: pkg.basesCount,
        ageRange: pkg.ageRange,
        includeMegaInflatable: pkg.includeMegaInflatable,
        includeMusicalFinale: pkg.includeMusicalFinale,
        activities: pkg.activities,
        isFeatured: pkg.isFeatured,
        isActive: true
      }
    })

    // Add images for package
    for (let index = 0; index < pkg.images.length; index++) {
      const image = pkg.images[index]
      await prisma.image.create({
        data: {
          url: image.url,
          alt: image.alt,
          order: index,
          packageId: createdPackage.id
        }
      })
    }
  }

  console.log(`✅ ${packages.length} paquetes creados`)

  console.log('🎉 Seed completado exitosamente!')
  console.log('📊 Resumen:')
  console.log(`   - ${createdCategories.length} categorías`)
  console.log(`   - ${services.length} servicios`)
  console.log(`   - ${packages.length} paquetes`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
