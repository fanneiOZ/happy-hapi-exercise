import { Route } from '../../libs/common/route.js'
import { AssignmentOneController } from './assignment-one.controller.js'

export default [new Route('POST', '/one').setHandler(AssignmentOneController)]
