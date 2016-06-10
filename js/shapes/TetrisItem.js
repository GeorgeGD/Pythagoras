var TetrisItemDescriptor =
    {
        CheckPosibleStart: function ( item_id, startCoordinate, maxSize )
        {
            var first = startCoordinate;
            var dist_x = ( maxSize - 1 ) - ( ( first ) % ( maxSize) );
            var dist_y = ( maxSize - 1 ) - (( ( first ) / ( maxSize) )>>0);
            switch ( item_id )
            {
                case 1:
                    {
                        return [dist_x >= 3, dist_y >= 3];
                    }
                case 2:
                    {
                        return [dist_x >= 1 && dist_x <= (maxSize-2) && dist_y >= 1, dist_x >= 1 && dist_y >= 2];
                    }
                case 3:
                    {
                        return [dist_x >= 1 && dist_x <= (maxSize-2) && dist_y >= 1, dist_x >= 1 && dist_y >= 2, dist_x >= 2 && dist_y >= 1, dist_x <= (maxSize-2) && dist_y >= 2];
                    }
                case 4:
                    {
                        return [dist_x >= 2 && dist_y >= 1, dist_x <= (maxSize-2) && dist_y >= 2];
                    }
                case 5:
                    {
                        return [dist_x <= (maxSize-3) && dist_y >= 1, dist_x >= 1 && dist_y >= 2, dist_x >= 2 && dist_y >= 1, dist_x >= 1 && dist_y >= 2];
                    }
                case 6:
                    {
                        return [dist_x >= 1 && dist_y >= 1];
                    }
                case 7:
                    {
                        return [dist_x >= 2 && dist_y >= 1, dist_x >= 1 && dist_y >= 2, dist_x >= 2 && dist_y >= 1, dist_x <= (maxSize-2) && dist_y >= 2];
                    }
                default: return [];
            }
        },

        GetCoordinates: function ( item_id, startCoordinate, maxSize )
        {
            var first = startCoordinate;
            switch ( item_id )
            {
                case 1:
                    {
                        return [
                            [first, first + 1, first + 2, first + 3],
                            [first, first + maxSize, first + 2 * ( maxSize ), first + 3 * ( maxSize )]
                        ];
                    }
                case 2:
                    {
                        return [
                            [first, first + 1, first + maxSize - 1, first + maxSize ],
                            [first, first + maxSize , first + maxSize + 1, first + 2 * ( maxSize ) + 1]
                        ];
                    }
                case 3:
                    {
                        return [
                          [first, first + maxSize - 1, first + maxSize, first + maxSize + 1],
                          [first, first + maxSize, first + maxSize + 1, first + 2 * ( maxSize )],
                          [first, first + 1, first + 2, first + ( maxSize ) + 1],
                          [first, first + maxSize - 1, first+maxSize, first + 2 * (maxSize)]
                        ];
                    }
                case 4:
                    {
                        return [
                            [first, first + 1, first + maxSize + 2, first + maxSize + 1],
                            [first, first + maxSize, first + maxSize - 1, first + 2 * ( maxSize ) - 1]
                        ];
                    }
                case 5:
                    {
                        return [
                            [first, first + maxSize - 2, first + maxSize - 1, first + maxSize ],
                            [first, first + maxSize, first + 2 * ( maxSize ), first + 2 * ( maxSize ) + 1],
                            [first, first + maxSize, first + 1, first + 2],
                            [first, first + 1, first + maxSize + 1, first + 2 * ( maxSize ) + 1 ]
                        ];
                    }
                case 6:
                    {
                        return [
                            [first, first + 1, first + maxSize, first + maxSize + 1 ]
                        ];
                    }
                case 7:
                    {
                        return [
                            [first, first + maxSize, first + maxSize + 1, first + maxSize + 2],
                            [first, first + 1, first + maxSize, first + 2 * ( maxSize )],
                            [first, first + 1, first + 2, first + maxSize + 2],
                            [first, first + maxSize, first + 2 * (maxSize), first + 2 * (maxSize) - 1]
                        ];
                    }
                default: return [];
            }
        }
    };