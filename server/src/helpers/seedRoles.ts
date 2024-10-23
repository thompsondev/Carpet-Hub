import { Role } from "../entity/role.entity";
import { predefinedRoles } from "../interfaces/role.interface";
import { AppDataSource } from "../db/data-source";

async function seedRoles() {
  // Initialize the data source
  await AppDataSource.initialize();

  const roleRepository = AppDataSource.getRepository(Role); // Use getRepository from the data source

  for (const roleData of predefinedRoles) {
    // Check if the role already exists
    const existingRole = await roleRepository.findOne({
      where: { id: roleData.id },
    });

    // If it doesn't exist, create it
    if (!existingRole) {
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
      console.log(`Role ${role.name} created.`);
    } else {
      console.log(`Role ${roleData.name} already exists.`);
    }
  }
}

export default seedRoles;
