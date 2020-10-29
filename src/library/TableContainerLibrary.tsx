//  Framwork
import React from 'react';

// Typing interface
import { ITableContainer, IRows } from './table.type';

// local file
import { TableHeader } from './TableHeader';
import { LibraryFolders } from './LibraryFolders';


// Material-UI
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

// ---------------------------------------------------------------------------------------
// Table tool bar. 
// ---------------------------------------------------------------------------------------
export const TableContainerLibrary: React.FC<ITableContainer> = () => {

    const rows: IRows[] = [
        {folderName: 'Agriculture  alternative',
            folderDescription: `
              L’agriculture alternative définit des systèmes de production s’éloignant des méthodes conventionnelles.
              La redécouverte de ces systèmes de production est éclairée par les concepts agroécologiques.
              Ces systèmes aspirent à atteindre des rendements durables tout en valorisant l’ensemble des ressources des agroécosystèmes.`,
            mindMap:[
                  {name:'Agroforesterie', 
                      description: `
                          L’agroforesterie est un mode d’exploitation des terres agricoles associant des arbres et des cultures ou de l'élevage.
                          L'association arbres et agricultures présente des avantages considérables notamment dans le domaine de la protection des sols. `,
                  },
                  {name:'Aquaponie', 
                      description: `
                          L'aquaponie est un système qui unit la culture de plante et l'élevage de poissons ;
                          les plantes sont parfois cultivées sur des billes d'argile, pouvant être irriguées en circuit fermé par de l'eau provenant d'aquarium où sont élevés les poissons.`,
                  },
                  {name:'Hydroponie', 
                      description: `
                          L’hydroponie ou culture hydroponique, est la culture de plantes réalisée sur un substrat neutre et inerte. 
                          Ce substrat est régulièrement irrigué d’un courant de solution qui apporte des sels minéraux et des nutriments essentiels à la plante.`,
                  }
            ],
        },
        {folderName: 'Cylces naturels',
        folderDescription: `
          Processus naturel au cours duquel les elements circulent continuellement sous diverses formes entre les différents milieux de l'environnement (par exemple l'air, l'eau, le sol, les organismes).
          Parmi les cycles naturels, on retrouve les cycles du carbone, de l'azote et du phosphore (cycles des éléments nutritifs) ainsi que le cycle de l'eau.`,
        mindMap:[
                {name:`Cycle de l'azote`, 
                 description: `
                  Le cycle de l'azote est un cycle biogéochimique qui décrit la succession des modifications subies par les différentes formes de l'azote neutre en formes réactives et vice-versa.`,
                },
                {name:`Cycle du carbone`, 
                 description: `
                  Le cycle du carbone est le cycle biogéochimique du carbone sur une planète.
                  Celui de la Terre est rendu plus complexe par l'existence d'importantes masses d'eau océaniques, et surtout par le fait que la vie y tient une place importante. `,
                },
                {name:`Cycle du phosphore`, 
                 description: `
                  Le cycle du phosphore est un cycle biogéochimique mettant en jeu le phosphore.
                  Le phosphore est un constituant indispensable de la matière organique, même si son importance pondérale est relativement faible par rapport à l'azote ou au potassium. `,
                }
            ],
        },      
      ];

    const folder = () => {
        return rows.map((currentRow) => {
            return <LibraryFolders
                    rowProps= {currentRow}
                    />
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader/>
                {folder()}
            </Table>
        </TableContainer>
    )
};



/* 
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell width='1%' padding='none'>
                            <Tooltip title='add folder' placement="left">
                                <IconButton aria-label='add folder'>
                                    <Avatar className={classes.avatarAddFolder}>
                                        <AddIcon aria-label="add folder"/>
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell className={classes.cellHead} align="center">Name folder</TableCell>
                        <TableCell className={classes.cellHead} align="center">Descriptif folder</TableCell>
                    </TableRow>
                </TableHead>



                <TableBody>

                    {rows.map((row) => (
                        <React.Fragment>
                            <TableRow key={row.folderName}>
                                <TableCell>
                                    <FolderOpenIcon/>
                                </TableCell>
                                <TableCell width='5%' align="right">
                                    <IconButton arial-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell className={classes.name}>{row.folderName}</TableCell>
                                <TableCell >{row.folderDescription}</TableCell>
                            </TableRow>
                            
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small" arial-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell width='1%' padding='none'>
                                                            <Tooltip title='add file' placement="left">
                                                                <IconButton aria-label='add file'>
                                                                    <Avatar className={classes.avatarAddMindmap}>
                                                                        <AddIcon />
                                                                    </Avatar>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell className={classes.cellHead} align="center">Name mindmap</TableCell>
                                                        <TableCell className={classes.cellHead} align="center">Description mindmap</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {row.mindMap.map((mindMapRow) => (
                                                        <TableRow key={mindMapRow.name}>
                                                            <TableCell>
                                                                <AssignmentIcon/>
                                                            </TableCell>
                                                            <TableCell width='5%' padding='none' align="right">
                                                                <Tooltip title='edit file' placement="left">
                                                                    <IconButton aria-label='edit file'>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell className={classes.name}>{mindMapRow.name}</TableCell>
                                                            <TableCell>{mindMapRow.description}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
*/