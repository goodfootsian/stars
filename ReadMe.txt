III/135A    Henry Draper Catalogue and Extension (Cannon+ 1918-1924; ADC 1989)
================================================================================
Henry Draper Catalogue and Extension 1 (HD,HDE)
    Cannon A.J., Pickering E.C.
   <Harv. Ann. 91-100 (1918-1924)>
   =1993yCat.3135....0C
================================================================================
ADC_Keywords: Spectral types ; Surveys

Description:
    An updated, corrected, and extended machine-readable version of
    The Henry Draper Catalogue (HD, Cannon & Pickering 1918-1924) is
    available with documentation from the Astronomical Data Center (ADC)
    as of April 1989. Published and unpublished errors discovered in the
    previous version have been corrected; letters indicating supplemental
    stars in the BD have been moved to a new byte to distinguish them from
    double-star components; and the machine-readable portion of
    The Henry Draper Extension (HDE) (HA 100; Cannon 1925-1936) has been
    converted to the same format as the main catalog with additional data
    added as necessary. The catalog lists HD numbers, Durchmusterung
    numbers, positions for equinox B1900, photovisual and photographic
    magnitudes, spectral types, codes for the intensity of the spectra
    used, and remarks.

File Summary:
--------------------------------------------------------------------------------
 FileName    Lrecl    Records    Explanations
--------------------------------------------------------------------------------
ReadMe          80          .    This file
adc.doc         80        840    Documentation by Nancy G. Roman and
                                    Wayne H. Warren Jr (1985)
catalog.dat     48     272150    Henry Draper catalogue
--------------------------------------------------------------------------------

See also:
    III/182 : HDE Charts: positions, proper motions (Nesterov+ 1995)

Byte-per-byte Description of file: catalog.dat
--------------------------------------------------------------------------------
   Bytes Format  Units   Label  Explanations
--------------------------------------------------------------------------------
   1-  6  I6     ---     HD     [1/272150]+ Henry Draper Catalog (HD) number
   7- 18  A12    ---     DM     Durchmusterung identification (1)
  19- 20  I2     h       RAh    Hours RA, equinox B1900, epoch 1900.0
  21- 23  I3     0.1min  RAdm   Deci-Minutes RA, equinox B1900, epoch 1900.0
      24  A1     ---     DE-    Sign Dec, equinox B1900, epoch 1900.0
  25- 26  I2     deg     DEd    Degrees Dec, equinox B1900, epoch 1900.0
  27- 28  I2     arcmin  DEm    Minutes Dec, equinox B1900, epoch 1900.0
      29  I1     ---   q_Ptm    [0/1]? Code for Ptm: 0 = measured, 1 = value
                                       inferred from Ptg and spectral type
  30- 34  F5.2   mag     Ptm    ? Photovisual magnitude (2)
      35  A1     ---   n_Ptm    [C] 'C' if Ptm is combined value with Ptg
      36  I1     ---   q_Ptg    [0/1]? Code for Ptg: 0 = measured, 1 = value
                                       inferred from Ptm and spectral type
  37- 41  F5.2   mag     Ptg    ? Photographic magnitude (2)
      42  A1     ---   n_Ptg    [C] 'C' if Ptg is combined value for this
                                  entry and the following or preceding entry
  43- 45  A3     ---     SpT    Spectral type
  46- 47  A2     ---     Int    [ 0-9B] Photographic intensity of spectrum (3)
      48  A1     ---     Rem    [DEGMR*] Remarks, see note (4)
--------------------------------------------------------------------------------
Note (1): the DM number is composed of:
     Bytes 7-8 = catalog ID, 'BD', 'CD', 'CP', or 'AG' for AGK1 stars
                (zones +50 to +59) not in the BD
     Bytes 9-16 = Durchmusterung catalog number, SZZNNNNN.
                 For AG zones, the ZZ field contains the lowest
                 declination zone in the appropriate catalog (50 or 55)
     Byte 17 = BD supplement letter (catalogue <I/71> by Warren and Kress)
     Byte 18 = DM component identification
Note (2): codes used for the magnitudes:
     20.0 =  nebula          (Neb  in published catalog)
     30.0 =  variable        (var. in published catalog)
     40.0 =  nova            (Nov. in published catalog)
     50.0 =  cluster         (Cl.  in published catalog)
     blank = no value in published catalog
Note (3): this intensity is a number between 1 and 10,
     but has the value 14 for HD 35041, and
     value 'B' for HD 37788 and 41366
Note (4): The codes are:
     D = Entry deleted (see adc.doc)
     E = Image at edge of plate
     G = Position and BD number taken directly from AGK1 and precessed to 1900
     M = Multiple images used (see adc.doc)
     R = Remark in the published catalog
     * = Spectral type refers a cluster, nebula or nebulous star. (see adc.doc)
--------------------------------------------------------------------------------
Remarks:
   According to W. H. Warren Jr., 194629 is identical to 194648 and the
   latter should be deleted.

References:
   Cannon, A.J. 1925-1936, The Henry Draper Extension, Ann. Astron. Obs.
      Harvard College, 100
   Cannon, A.J., and Pickering, E.C. 1918-1924, The Henry Draper Catalogue,
      Ann. Astron. Obs. Harvard College, 91-99

Historical Notes:
  * February 1985: see the attached file "adc.doc" by Nancy G. Roman
    and Wayne H. Warren Jr. (document NSSDC/WDC-A-R&S 84-18); its
    section 4 described the story of the catalog.
  * October 1993: the following few modifications have been added at CDS
    (a) insertion of the decimal point for Ptm and Ptg fields
    (b) three stars had a declination "-6860" corrected to "-6900":
        269534, 269975, 270350
    (c) a 0 digit missing in the DEm field of stars
        16110 16112 16126 16131 16138 16150 16156 16183 16187 16189
        has been added
    (d) the spectrum of star 4815 has been corrected
  * 16-Apr-1994: Following a note by Sh. Nishimura (NAO Japan),
    about 60 remarks E and P (emission and peculiar) were changed to
    lowercase letters. BD designation of star 237694 have been changed
    from BD+567 1286  to BD+56 1286.
  * 02-Jan-1996: List of Errata by W.H. Warren Jr. <w3whw@gibbs.gsfc.nasa.gov>
  * 08-Nov-1996: (version 'A')
    The following errors reported by W. H. Warren were corrected:
    ==============================================
      HD   Datum    For        Read       Remarks
    ----------------------------------------------
     11502* DM  BD+18  243 B BD+18  243 A
     11503* DM  BD+18  243 A BD+18  243 B
     43436* DM  BD+67  424 A BD+67  423a  DMSup *
     50227* DM  BD+23 1523 A BD+23 1523   No comp.
     51295* DM  BD+23 1554 A BD+23 1554   No comp.
     54052* DM  BD+06 1526 A BD+06 1526   No comp.
    135780* Dec  -41 57       -41 47      MHD2
    144069* DM  BD-10 4237 A BD-10 4237 B
    144070* DM  BD-10 4237 B BD-10 4237 A
    159000* DM  BD+44 2722 B BD+44 2721a  DMSup *
    159001* DM  BD+44 2722 B BD+44 2722
    192788* DM  BD+30 3960 A BD+30 3960a  DMSup *
    193877* DM  BD+01 3984   BD-00 3984
    194629* DM  BD+74  858 A BD+74  858   AB dupes
    194648* Delete (use code "D")         =194629
    228312* DM     ---       BD+37 3826a  BDSup. *
    242495* DM     ---       BD+17  893   AG+17 472
    267646* DM  BD+27 1293   BD+27 1293 A
    267647* DM  BD+27 1294 A BD+27 1293 B
    267648* DM  BD+27 1294 B BD+27 1294   from WDS
    268053* DM     ---       BD+33 1455   AG+33 725
    ==============================================

================================================================================
(End)                  Francois Ochsenbein [CDS]                     11-Oct-1993
