import {combineReducers} from 'redux';
import apps from './app'
import user from './auth'

export default combineReducers({
    apps,user
})
