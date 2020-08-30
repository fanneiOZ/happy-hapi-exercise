import { Route } from '../../libs/common/route.js'
import { assignmentOneController } from './assignment-one.controller.js'
import { assignmentTwoController } from './assignment-two.controller.js'

export default [
    new Route('POST', '/one').setHandler(assignmentOneController),
    new Route('GET', '/two').setHandler(assignmentTwoController),
]
