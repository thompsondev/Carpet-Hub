import { Role } from "../entity/role.entity";
import { predefinedRoles, RoleID } from "../interfaces/role.interface";
import { IAppDataConnection } from "../server";

const unused = "a";

async function seedRoles(AppDataConnection: IAppDataConnection) {
  // Check if data source is initialized and initialize if false
  if (!AppDataConnection.isInitialized) {
    await AppDataConnection.initialize();
  }

  const roleRepository = AppDataConnection.getRepository(Role); // Use getRepository from the data source

  for (const roleData of predefinedRoles) {
    // Check if the role already exists
    const existingRole = await roleRepository.findOne({
      where: { id: roleData.id },
    });

    // If it doesn't exist, create it
    if (!existingRole) {
      const role = roleRepository.create(roleData);
      const newRole = await roleRepository.save(role);
      console.log(`Role ${role.name} created.`);
    } else {
      console.log(`Role ${roleData.name} already exists.`);
    }
  }
}

export default seedRoles;
