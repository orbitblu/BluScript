import { generateProject } from './services/projectService';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  const projectName = args[1];
  generateProject(projectName);
  console.log(`Project ${projectName} created successfully!`);
} else {
  console.log('Unknown command');
}