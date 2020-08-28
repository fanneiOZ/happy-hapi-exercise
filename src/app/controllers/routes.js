import { Route } from '../../libs/common/route'
import { AssignmentOneController } from './assignment-one.controller'

export default [new Route('POST', '/one').setHandler(AssignmentOneController)]
