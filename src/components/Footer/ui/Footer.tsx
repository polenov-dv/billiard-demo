import cls from './Footer.module.scss';

export const Footer = () => (
  <footer className={cls.footer}>
    <div className={`${cls.inner} container`}>
      <span>@2024</span>
      <table>
        <tbody>
          <tr>
            <td className={cls.desc}>Mail:</td>
            <td>
              <a className={cls.link} href='mailto:polenovdimaprok@gmail.com'>
                polenovdimaprok@gmail.com
              </a>
            </td>
          </tr>
          <tr>
            <td className={cls.desc}>GitHub:</td>
            <td>
              <a className={cls.link} href='https://github.com/polenov-dv'>
                polenov-dv
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </footer>
);
