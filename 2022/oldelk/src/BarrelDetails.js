import BevelBox from './BevelBox';
import TripleImage from './TripleImage';
import { Flex, SimpleGrid, Link, Text, useBreakpoint } from '@chakra-ui/react';

const BarrelDetails = ({ barrelData }) => {
    const formatDate = (date) => {
        if (date) {
            const year = date.slice(0, 4)
            const month = date.slice(5, 7)
            const day = date.slice(8, 10)
            return `${month}-${day}-${year}`;
        }
        else {
            return '—'
        }
    }

    const findTeamMemberEmail = function (name) {
        const salesPerson = barrelData.teamMembers.find(tm => tm.name === name)
        return salesPerson ? salesPerson.email : 'info@oldelk.com';
    }

    const bd = [
        { label: 'Barrel Number', data: barrelData.barrelId },
        { label: 'Whiskey Type', data: barrelData.whiskeyType || '—' },
        { label: 'Date Chosen', data: formatDate(barrelData.chosenDate) },
        { label: 'Date Bottled', data: formatDate(barrelData.bottleDate) },
        { label: 'Proof', data: barrelData.proof || '—' },
        { label: 'Yield', data: barrelData.casesProduced ? `${barrelData.casesProduced} Cases` : '—' },
        { label: 'Ship Date', data: formatDate(barrelData.shipDate) },
        { label: 'Physical Barrel', data: barrelData.physicalBarrel || '—' },
        {
            label: 'Old Elk Contact', data: {
                name: barrelData?.teamMember || '—',
                email: findTeamMemberEmail(barrelData?.teamMember)
            }
        }
    ]

    const breakpoint = useBreakpoint()

    return (
        <Flex flexDir={'column'} w={'100%'}>
            <BevelBox label={'Barrel Details'}>
                {bd.map((b, index) => {
                    return (
                        <SimpleGrid key={`row_${index}`} p={2} paddingBottom={1} columns={2} spacing={12} borderBottomWidth={index < bd.length - 1 ? '1px' : 0} borderStyle={'solid'} borderColor={'brand'}>
                            <Text variant={'label'} textAlign={'right'}>{b.label}</Text>
                            {b.label === 'Old Elk Contact' ? (
                                <Text as={Link} variant={'label'} href={`mailto:${b.data.email}`} fontWeight={800}>{b.data.name}</Text>
                            ) : (
                                <Text variant={'label'} fontWeight={800}>{b.data ? b.data : '—'}</Text>
                            )}
                        </SimpleGrid>

                    )
                })}
            </BevelBox>
            {(breakpoint === 'base' || breakpoint === 'sm' || !barrelData.secondaryLabel) && (
                <TripleImage />
            )}

        </Flex>
    )
}

export default BarrelDetails;