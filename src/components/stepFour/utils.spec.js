import { buildReservedTokensArgs } from './utils'

const addresses = [
  '0xf0a84564aea1f9381272c5dc73e68ee3a2eb0bd2',
  '0x660d0537752438d419caa39d27c1f4cb03e99d3a',
  '0xe9b3ce55900f933e3d1a5cb783409d32d101a41f'
]

describe('stepFour utils', () => {
  describe('buildReservedTokensArgs', () => {
    it('should build the arguments for reservations in tokens', () => {
      // Given
      const reservedTokens = [{
        addr: addresses[0],
        dim: 'tokens',
        val: 10
      }, {
        addr: addresses[1],
        dim: 'tokens',
        val: 20
      }]
      const decimals = 0

      // When
      const {
        addrs,
        inTokens,
        inPercentageUnit,
        inPercentageDecimals
      } = buildReservedTokensArgs(reservedTokens, decimals)

      // Then
      expect(addrs).toEqual(addresses.slice(0, 2))
      expect(inTokens).toEqual(['10', '20'])
      expect(inPercentageUnit).toEqual([0, 0])
      expect(inPercentageDecimals).toEqual([0, 0])
    })

    it('should build the arguments for reservations in percentage', () => {
      // Given
      const reservedTokens = [{
        addr: addresses[0],
        dim: 'percentage',
        val: '12.5'
      }, {
        addr: addresses[1],
        dim: 'percentage',
        val: '50.0'
      }]
      const decimals = 1

      // When
      const {
        addrs,
        inTokens,
        inPercentageUnit,
        inPercentageDecimals
      } = buildReservedTokensArgs(reservedTokens, decimals)

      // Then
      expect(addrs).toEqual(addresses.slice(0, 2))
      expect(inTokens).toEqual([0, 0])
      expect(inPercentageUnit).toEqual([125, 500])
      expect(inPercentageDecimals).toEqual([1, 1])
    })

    it('should work for both tokens and decimals', () => {
      const reservedTokens = [{
        addr: addresses[0],
        dim: 'tokens',
        val: 10
      }, {
        addr: addresses[1],
        dim: 'percentage',
        val: '12.5'
      }]
      const decimals = 1

      // When
      const {
        addrs,
        inTokens,
        inPercentageUnit,
        inPercentageDecimals
      } = buildReservedTokensArgs(reservedTokens, decimals)

      // Then
      expect(addrs).toEqual(addresses.slice(0, 2))
      expect(inTokens).toEqual(['100', 0])
      expect(inPercentageUnit).toEqual([0, 125])
      expect(inPercentageDecimals).toEqual([0, 1])
    })

    it('should allow reserving in both tokens and percentage for the same address', () => {
      const reservedTokens = [{
        addr: addresses[0],
        dim: 'tokens',
        val: 10
      }, {
        addr: addresses[0],
        dim: 'percentage',
        val: '12.5'
      }]
      const decimals = 1

      // When
      const {
        addrs,
        inTokens,
        inPercentageUnit,
        inPercentageDecimals
      } = buildReservedTokensArgs(reservedTokens, decimals)

      // Then
      expect(addrs).toEqual([addresses[0]])
      expect(inTokens).toEqual(['100'])
      expect(inPercentageUnit).toEqual([125])
      expect(inPercentageDecimals).toEqual([1])
    })
  })
})
