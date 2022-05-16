import { ComponentInstance, PropsType } from '../../typings/index';

export function initProps (instance: ComponentInstance, rawProps: PropsType) {
  instance.props = rawProps || {};
}
