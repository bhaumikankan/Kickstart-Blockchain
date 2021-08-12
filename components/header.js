import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import {Link} from '../routes'

export default class Navber extends Component {
  render() {
    return (
      <Menu size='large' style={{marginTop:'10px'}}>
        <Link route='/'>
          <a className='item'>Kickstart</a>
        </Link>
        <Menu.Menu position='right'>
        <Link route='/'>
        <Menu.Item
          name='Campaigns'
         />
          </Link>
          <Menu.Item>
          <Link route='/campaigns/new'>
          <Button primary icon="add circle"></Button>
          </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
