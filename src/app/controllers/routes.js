import { Route } from '../../libs/common/route.js'
import { AssignmentOneController } from './assignment-one.controller.js'
import { AssignmentTwoController } from './assignment-two.controller.js'

export default [
    new Route('POST', '/one').setHandler(AssignmentOneController),
    new Route('GET', '/two').setHandler(AssignmentTwoController),
]
