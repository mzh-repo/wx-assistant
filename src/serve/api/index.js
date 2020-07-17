import http from "../api";

export function alreadyFriend(id) {
  return http.get(`/friends/${id}/already_friend`);
}
