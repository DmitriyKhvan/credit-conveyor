import ApiService from './api.service'
import TokenService from './storage.service'

const UserService = {
  getUserProfilePhotoUrl(emp_id) {
    return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
  }
}

export default UserService
