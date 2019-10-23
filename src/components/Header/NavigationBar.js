import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleLogout } from '../../actions/Auth.action'

const NavigationBar = (props) => {

    const { user, isAuthenticated } = props;
    const guestLink = (<Nav>
        <Nav.Link href="/register">Sign up</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
    )
    const userLink = (<Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <Nav.Link href="/user/info">{user.realname}</Nav.Link>
        </Navbar.Text>
        <Nav.Link href="/logout" onClick={(event) => {
            event.preventDefault();
            props.logout();
        }}>logout</Nav.Link>
    </Navbar.Collapse>)

    return (<Navbar bg="light" expand="lg" className="nav-header">
        <Navbar.Brand href="/home">Caro Viet Nam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/game">Game</Nav.Link>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>

        </Navbar.Collapse>
        {(isAuthenticated) ? userLink : guestLink}

    </Navbar>)
}

const mapStateToProps = state => state.Auth
const mapDispatchToProps = { logout: handleLogout }

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)