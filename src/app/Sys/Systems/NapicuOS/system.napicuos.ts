import { System } from '../../System';

function SystemDecorator(options: { boot: { title: string; logo: string } }) {
  return (target: Function & typeof System) => {
    target.boot.logo = options.boot.logo;
    target.boot.title = options.boot.title;
  };
}

@SystemDecorator({
  boot: {
    title: 'NapicuOS',
    logo: 'xd',
  },
})
class NapicuOS extends System { }

