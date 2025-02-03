import { Spirit } from './Spirit'

export enum SpiritColor {
  Wood = 1,
  Blue
}

export type SpiritDescription = {
  color?: SpiritColor
}

export const Fish: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Deer: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Eagle: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Bear: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Dragonfly: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Beetle: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Groundhog: SpiritDescription = {
  color: SpiritColor.Wood,
}

export const Bee: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Ladybug: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Wolf: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Squirrel: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Bird: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Lizard: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Butterfly: SpiritDescription = {
  color: SpiritColor.Blue
}

export const EvilBeaver: SpiritDescription = {
}

// Firefly ext
export const Cow: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Phoenix: SpiritDescription = {
  color: SpiritColor.Blue
}

export const Viper: SpiritDescription = {
  color: SpiritColor.Wood
}

export const Fox: SpiritDescription = {
  color: SpiritColor.Wood
}

export const SpiritDescriptions: Record<Spirit, SpiritDescription> = {
  [Spirit.Fish]: Fish,
  [Spirit.Deer]: Deer,
  [Spirit.Eagle]: Eagle,
  [Spirit.Bear]: Bear,
  [Spirit.Dragonfly]: Dragonfly,
  [Spirit.Beetle]: Beetle,
  [Spirit.Groundhog]: Groundhog,
  [Spirit.Bee]: Bee,
  [Spirit.Ladybug]: Ladybug,
  [Spirit.Wolf]: Wolf,
  [Spirit.Squirrel]: Squirrel,
  [Spirit.Bird]: Bird,
  [Spirit.Lizard]: Lizard,
  [Spirit.Butterfly]: Butterfly,
  [Spirit.EvilBeaver]: EvilBeaver,

  [Spirit.Cow]: Cow,
  [Spirit.Phoenix]: Phoenix,
  [Spirit.Viper]: Viper,
  [Spirit.Fox]: Fox,

}
