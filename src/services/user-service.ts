import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();

    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return {
      request,
      cancel: () => {
        controller.abort();
      },
    };
  }

  createUser(newUser: User) {
    return apiClient.post("/users/", newUser);
  }

//   deleteUser(id: number) {} -- then pass use.id to it
  deleteUser(user: User) {
    return apiClient.delete("/users/" + user.id);
  }

  updateUser(user: User, updatedUser: User) {
    return apiClient.patch("/users/" + user.id, updatedUser);
  }
}

export default new UserService();
