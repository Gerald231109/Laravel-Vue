import http from "../http-common";

class DataService {

    getAll() {
        return http.get('/api/comments/');
    }

    deleteComment(id) {
        return http.delete(`/api/comments/${id}`);
    }

    createComment(data) {
        return http.post('/api/comments/', data);
    }








}

export default new DataService();