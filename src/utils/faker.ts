// A simple faker utility to generate random data without external dependencies

// Product name parts
const adjectives = [
  'Premium', 'Ultra', 'Deluxe', 'Advanced', 'Essential', 'Elegant', 'Professional',
  'Classic', 'Modern', 'Smart', 'Innovative', 'Sleek', 'Compact', 'Portable',
  'Durable', 'Efficient', 'Dynamic', 'Versatile', 'Reliable', 'Powerful'
];

const nouns = [
  'Widget', 'Device', 'System', 'Tool', 'Solution', 'Machine', 'Gadget',
  'Application', 'Platform', 'Framework', 'Package', 'Component', 'Module',
  'Extension', 'Algorithm', 'Interface', 'Technology', 'Hardware', 'Software'
];

const types = [
  'Pro', 'Plus', 'Max', 'Ultra', 'Series', 'Edition', 'Version', 'Kit',
  'Pack', 'Bundle', 'Collection', 'Set', 'Suite', 'Package', 'X', 'Z', 'Alpha', 'Prime'
];

// Lorem ipsum paragraphs
const loremIpsumParagraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.',
  'Pellentesque sit amet hendrerit risus, sed porttitor quam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  'Ut viverra, eros in venenatis hendrerit, nisi augue hendrerit nulla, id sagittis metus quam a sem.',
  'Cras non diam ac erat rhoncus dapibus. Donec consectetur mauris in diam condimentum, sit amet tincidunt purus finibus.',
  'Nulla facilisi. In hac habitasse platea dictumst. Curabitur at felis malesuada, mollis nibh vel, volutpat est.',
  'Integer vel diam vitae nisl pellentesque efficitur. Nullam accumsan felis ut tincidunt dapibus.'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const faker = {
  generateProductName(): string {
    const adj = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    const type = Math.random() > 0.5 ? ` ${getRandomElement(types)}` : '';
    return `${adj} ${noun}${type}`;
  },
  
  generateDescription(): string {
    const sentences = getRandomNumber(1, 3);
    let description = '';
    
    for (let i = 0; i < sentences; i++) {
      description += getRandomElement(loremIpsumParagraphs) + ' ';
    }
    
    return description.trim();
  },
  
  generateSentence(): string {
    return getRandomElement(loremIpsumParagraphs);
  },
  
  generateParagraph(sentences: number = 5): string {
    let paragraph = '';
    for (let i = 0; i < sentences; i++) {
      paragraph += getRandomElement(loremIpsumParagraphs) + ' ';
    }
    return paragraph.trim();
  }
};