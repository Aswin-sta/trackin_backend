import { UUID } from "crypto";
import User from "../models/user";

type userDataFromAdType = {
  "@odata.context": string;
  id: string;
  department: string;
  employeeId: string | null;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  jobTitle: string | null;
};
async function updateUserOrCreate(ssoId: UUID, data: userDataFromAdType) {
  let entity = await User.findOne({ where: { ssoId } });

  if (entity) {
    const updatedData = {
      ssoId: data.id,
      jobTitle: data.jobTitle || "test role",
      department: data.department,
      isActive: true,
    };

    if (entity.jobTitle !== updatedData.jobTitle) {
      entity = await entity.update(updatedData);
    }
  } else {
    entity = await User.create({
      ssoId: data.id,
      employeeId: data.employeeId || Math.floor(Math.random() * 1000),
      email: data.userPrincipalName,
      firstName: data.givenName,
      lastName: data.surname || "test",
      jobTitle: data.jobTitle || "test role",
      department: data.department,
      isActive: true,
    });
  }

  return entity;
}

export default updateUserOrCreate;
