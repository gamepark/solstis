import { RoundTokenDescription } from '@gamepark/react-game'
import Firefly from '../images/firefly/firefly.jpg'
import { FireflyHelp } from './help/FireflyHelp'

export class FireflyDescription extends RoundTokenDescription {
  image = Firefly
  diameter = 2

  help = FireflyHelp

}

export const fireflyDescription = new FireflyDescription()
