import { getRepository } from "typeorm";
import { Role } from "../entity/role.entity";
import { predefinedRoles } from "../interfaces/role.interface";

async function seedRoles() {
  const roleRepository = getRepository(Role);

  for (const roleData of predefinedRoles) {
    // Check if the role already exists
    const existingRole = await roleRepository.findOne({
      where: { name: roleData.name },
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
