/* eslint-disable no-undef */
import {
  only, except, combine,
  eachOnly, eachExcept
} from '@modules/transform'

import { expect } from 'chai'

const getUser = () => ({
  firstName: 'Alice',
  lastName: 'Black',
  email: 'alice@mail.com',
  password: '1111'
})

describe('Transform Module', () => {
  describe('only()', () => {
    const user = getUser()

    it('leaves only passed attributes', () => {
      const expected = {
        email: user.email,
        password: user.password
      }
      const actual = only('email', 'password')(user)

      expect(actual).to.deep.equal(expected)
    })

    it('works with array of attributes', () => {
      const expected = {
        email: user.email,
        password: user.password
      }
      const actual = only(['email', 'password'])(user)

      expect(actual).to.deep.equal(expected)
    })

    it('produces empty result if passed no attributes', () => {
      const expected = {}
      const actual = only()(user)

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('except()', () => {
    const user = getUser()

    it('omits passed attributes', () => {
      const expected = {
        firstName: user.firstName,
        lastName: user.lastName
      }
      const actual = except('email', 'password')(user)

      expect(actual).to.deep.equal(expected)
    })

    it('works with array of attributes', () => {
      const expected = {
        firstName: user.firstName,
        lastName: user.lastName
      }
      const actual = except(['email', 'password'])(user)

      expect(actual).to.deep.equal(expected)
    })

    it('does not modifies data if passed no attributes', () => {
      const expected = user
      const actual = except()(user)

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('combine()', () => {
    const user = getUser()

    it('combines properly 2 only\'s', () => {
      const expected = {
        password: user.password
      }
      const actual = combine(
        only('email', 'password'),
        only('password')
      )(user)

      expect(actual).to.deep.equal(expected)
    })

    it('combines properly only and except', () => {
      const expected = {
        email: user.email,
        firstName: user.firstName
      }
      const actual = combine(
        only('email', 'password', 'firstName'),
        except('password'),
      )(user)

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('eachOnly()', () => {
    const user = getUser()
    const users = [getUser(), getUser()]

    it('leaves only passed attributes for each item in array', () => {
      const expected = [
        { email: user.email, firstName: user.firstName },
        { email: user.email, firstName: user.firstName },
      ]
      const actual = eachOnly('email', 'firstName')(users)

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('eachExcept()', () => {
    const user = getUser()
    const users = [getUser(), getUser()]

    it('omits passed attributes for each item in array', () => {
      const expected = [
        { email: user.email, firstName: user.firstName },
        { email: user.email, firstName: user.firstName },
      ]
      const actual = eachExcept('password', 'lastName')(users)

      expect(actual).to.deep.equal(expected)
    })
  })
})
