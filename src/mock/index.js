import Mock from 'mockjs';

const Random = Mock.Random;

// 生成宠物特征
const generateTraits = () => {
  const elements = ['火', '水', '木', '光', '暗'];
  const personalities = ['勇敢', '谨慎', '活泼', '冷静', '温和'];
  return {
    element: Random.pick(elements),
    personality: Random.pick(personalities),
    strength: Random.integer(1, 100),
    agility: Random.integer(1, 100),
    intelligence: Random.integer(1, 100),
    vitality: Random.integer(1, 100),
  };
};

// 生成宠物技能
const generateAbilities = (element) => {
  const abilities = {
    火: ['烈焰冲击', '火球术', '熔岩护盾', '狂野之火'],
    水: ['水流术', '冰冻光环', '治愈之泉', '海啸'],
    木: ['藤蔓缠绕', '自然之力', '生命汲取', '森林庇护'],
    光: ['圣光术', '天使祝福', '神圣审判', '光明护盾'],
    暗: ['暗影箭', '死亡缠绕', '虚空打击', '暗黑结界'],
  };
  return Random.pick(abilities[element], 1, 2);
};

// 生成宠物图片
const generatePetImage = (type) => {
  const images = {
    Dragon: [
      'https://img.freepik.com/free-vector/hand-drawn-dragon-outline-illustration_23-2149437316.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-kawaii-dragon-illustration_23-2149437324.jpg',
    ],
    Cat: [
      'https://img.freepik.com/free-vector/cute-cat-playing-yarn-ball-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4148.jpg',
      'https://img.freepik.com/free-vector/cute-cool-cat-wearing-sunglasses-cartoon-vector-icon-illustration-animal-fashion-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3667.jpg',
      'https://img.freepik.com/free-vector/cute-cat-playing-yarn-ball-cartoon-vector-icon-illustration_138676-2105.jpg',
    ],
    Monster: [
      'https://img.freepik.com/free-vector/cute-monster-with-three-eyes-cartoon-icon-illustration_138676-2743.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-kawaii-monsters-collection_23-2149453942.jpg',
    ],
  };
  return Random.pick(images[type]);
};

// 宠物类型和对应的图片
const petImages = {
  Dragon: [
    'https://img.freepik.com/free-vector/hand-drawn-dragon-outline-illustration_23-2149437316.jpg',
    'https://img.freepik.com/free-vector/hand-drawn-kawaii-dragon-illustration_23-2149437324.jpg',
  ],
  Cat: [
    'https://img.freepik.com/free-vector/cute-cat-playing-yarn-ball-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4148.jpg',
    'https://img.freepik.com/free-vector/cute-cool-cat-wearing-sunglasses-cartoon-vector-icon-illustration-animal-fashion-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3667.jpg',
    'https://img.freepik.com/free-vector/cute-cat-playing-yarn-ball-cartoon-vector-icon-illustration_138676-2105.jpg',
  ],
  Dog: [
    'https://img.freepik.com/free-vector/cute-corgi-dog-waving-paw-cartoon_138676-2238.jpg',
    'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3743.jpg',
  ],
  Bird: [
    'https://img.freepik.com/free-vector/cute-bird-cartoon-sitting-tree-branch_138676-2251.jpg',
    'https://img.freepik.com/free-vector/cute-blue-bird-cartoon-flying_138676-2252.jpg',
  ],
};

// 特性列表
const traits = [
  'Fire',
  'Water',
  'Earth',
  'Air',
  'Electric',
  'Ice',
  'Brave',
  'Timid',
  'Smart',
  'Strong',
];

// 生成随机宠物数据
Mock.mock('/api/my-pets', 'get', () => {
  const count = Mock.Random.integer(0, 5); // 随机生成0-5个宠物
  const pets = [];

  for (let i = 0; i < count; i++) {
    const species = Mock.Random.pick(Object.keys(petImages));
    const images = petImages[species];

    pets.push({
      id: Mock.Random.guid(),
      name: Mock.Random.ctitle(2, 4),
      image: Mock.Random.pick(images),
      level: Mock.Random.integer(1, 10),
      species: species,
      traits: Mock.Random.shuffle(traits).slice(0, Mock.Random.integer(1, 3)),
      experience: Mock.Random.integer(0, 200),
      createdAt: Mock.Random.date('yyyy-MM-dd'),
    });
  }

  return pets;
});

// 生成对手数据
Mock.mock('/api/opponents', 'get', () => {
  const opponents = [];
  const types = ['Dragon', 'Cat', 'Monster'];
  const count = Random.integer(3, 6);

  for (let i = 0; i < count; i++) {
    const type = Random.pick(types);
    const traits = generateTraits();
    opponents.push({
      id: Random.id(),
      name: Random.cword(2, 4) + Random.pick(['龙', '猫', '兽']),
      image: generatePetImage(type),
      level: Random.integer(1, 30),
      type,
      traits,
      abilities: generateAbilities(traits.element),
      owner: '0x' + Random.string('0123456789abcdef', 40),
      winRate: Random.integer(30, 80) + '%',
      battleCount: Random.integer(10, 100),
    });
  }

  return {
    code: 200,
    data: opponents,
    message: 'success',
  };
});

// 生成战斗日志
Mock.mock('/api/battle-log', 'post', () => {
  const rounds = Random.integer(4, 8);
  const logs = [];
  const status = ['攻击', '防御', '使用技能', '恢复生命'];

  for (let i = 0; i < rounds; i++) {
    const action = Random.pick(status);
    logs.push({
      round: i + 1,
      timestamp: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      action,
      damage: action === '攻击' ? Random.integer(10, 100) : 0,
      healing: action === '恢复生命' ? Random.integer(20, 50) : 0,
      description: Random.csentence(10, 20),
    });
  }

  return {
    code: 200,
    data: {
      battleId: Random.id(),
      startTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      endTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      logs,
      result: Random.boolean() ? 'victory' : 'defeat',
      rewards: {
        experience: Random.integer(50, 200),
        items: Array(Random.integer(1, 3))
          .fill()
          .map(() => ({
            id: Random.id(),
            name: Random.cword(2, 4) + Random.pick(['宝石', '徽章', '碎片']),
            rarity: Random.pick(['普通', '稀有', '史诗']),
            quantity: Random.integer(1, 5),
          })),
      },
    },
    message: 'success',
  };
});

// 生成NFT数据
Mock.mock('/api/marketplace/nfts', 'get', () => {
  const nfts = [];
  const types = ['Dragon', 'Cat', 'Monster'];
  const rarities = ['普通', '稀有', '史诗', '传说'];
  const count = Random.integer(8, 16);

  for (let i = 0; i < count; i++) {
    const type = Random.pick(types);
    nfts.push({
      id: Random.id(),
      name: Random.cword(2, 4) + Random.pick(['龙', '猫', '兽']),
      type,
      level: Random.integer(1, 100),
      rarity: Random.pick(rarities),
      price: Random.float(0.1, 10, 2, 2),
      owner: '0x' + Random.string('0123456789abcdef', 40),
      createdAt: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      attributes: {
        strength: Random.integer(1, 100),
        agility: Random.integer(1, 100),
        intelligence: Random.integer(1, 100),
        vitality: Random.integer(1, 100),
      },
    });
  }

  return {
    code: 200,
    data: nfts,
    message: 'success',
  };
});

export default Mock;
